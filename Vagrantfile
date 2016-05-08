Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "swen303-group-project"
  config.vm.synced_folder ".", "/var/www/swen303-group-project"

  config.vm.network "private_network", ip: "10.1.0.50"
  config.vm.network "forwarded_port", guest: 5432, host: 15432

  config.vm.provider "virtualbox" do |vb|
    vb.name = "swen303-group-project"
    vb.memory = "1024"
  end

  config.vm.provision "shell", path: "bootstrap.sh"
end
