#!/bin/bash
DB_USER=pgsql
DB_PASS=pgsql
DB_NAME=swen303
PG_VERSION=9.4

PROVISIONED_ON=/etc/vm_provision_on_timestamp
if [ -f "$PROVISIONED_ON" ]
then
  echo "VM was already provisioned at: $(cat $PROVISIONED_ON)"
  echo "DATABASE_URL=postgres://$DB_USER:$DB_PASS@localhost:15432/$DB_NAME"
  exit
fi

PG_REPO_APT_SOURCE=/etc/apt/sources.list.d/pgdg.list
if [ ! -f "$PG_REPO_APT_SOURCE" ]
then
  echo "deb http://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main" > "$PG_REPO_APT_SOURCE"
  wget --quiet -O - https://apt.postgresql.org/pub/repos/apt/ACCC4CF8.asc | apt-key add -
fi

apt-get update
apt-get -y install "postgresql-$PG_VERSION" "postgresql-contrib-$PG_VERSION"

PG_CONF="/etc/postgresql/$PG_VERSION/main/postgresql.conf"
PG_HBA="/etc/postgresql/$PG_VERSION/main/pg_hba.conf"
PG_DIR="/var/lib/postgresql/$PG_VERSION/main"

sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" "$PG_CONF"
echo "host all all all md5" >> "$PG_HBA"
echo "client_encoding = utf8" >> "$PG_CONF"

service postgresql restart

sudo -u postgres -i
wget http://ecs.victoria.ac.nz/foswiki/pub/Courses/SWEN303_2016T1/Assignments/sampleDatabase.sql -O db.sql
sed -i "s/303/$DB_NAME/g" db.sql
sudo -u postgres psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';"
sudo -u postgres psql -c "CREATE DATABASE $DB_NAME"
sudo -u postgres psql $DB_NAME < db.sql

sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"
sudo -u postgres psql -c "ALTER DATABASE $DB_NAME OWNER TO $DB_USER"

for tbl in `sudo -u postgres psql -qAt -c "select tablename from pg_tables where schemaname = 'public';" $DB_NAME` ; do sudo -u postgres psql -c "alter table \"$tbl\" owner to $DB_USER" $DB_NAME ; done
for tbl in `sudo -u postgres psql -qAt -c "select sequence_name from information_schema.sequences where sequence_schema = 'public';" $DB_NAME` ; do sudo -u postgres psql -c "alter table \"$tbl\" owner to $DB_USER" $DB_NAME ; done

echo "Successfully installed PostgreSQL!"
echo "DATABASE_URL=postgres://$DB_USER:$DB_PASS@localhost:15432/$DB_NAME"
