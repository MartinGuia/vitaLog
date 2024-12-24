import Client from "../models/client.model.js";

export const registerClient = async (req, res) => {
  const { name, alias, address1, city, region, zipCode, country } = req.body;

  try {
    const clientFound = await Client.findOne({ name });
    if (clientFound)
      return res.status(409).json({ message: "Client already exists" });

    const newClient = new Client({
      name,
      alias,
      address1,
      city,
      region,
      zipCode,
      country,
    });

    const clientSaved = await newClient.save();

    res.json({
      id: clientSaved._id,
      name: clientSaved.name,
      alias: clientSaved.alias,
      address1: clientSaved.address1,
      city: clientSaved.city,
      region: clientSaved.region,
      zipCode: clientSaved.zipCode,
      country: clientSaved.country,
      createdAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getClients = async (req, res) => {
  try {
    //Obtiene todos los clientes de la base de datos y los guarda en una constante.
    const clients = await Client.find({});

    //Envía la lista de usuarios a la api del front en formato JSON.
    res.status(200).json(clients);
  } catch (error) {
    console.error("Erros al obtener los clientes:", error);
    res
      .status(500)
      .json({ succes: false, message: "Error interno del servidor" });
  }
};

export const getClientById = async (req, res) => {
  try {
    // Obtén el id del cliente desde la URL
    const clientId = req.params.id;

    //Busca el cliente por su id
    const clientFound = await Client.findById(clientId);

    //Si no se encuentra el cliente, responde un error 404
    if (!clientFound)
      return res.status(404).json({ message: "Cliente no encontrado" });

    //Si el cliente se encuentra, responde con los detalles del cliente
    return res.json({
      id: clientFound._id,
      name: clientFound.name,
      alias: clientFound.alias,
      address1: clientFound.address1,
      city: clientFound.city,
      region: clientFound.region,
      zipCode: clientFound.zipCode,
      country: clientFound.country,
      createdAt: clientFound.createdAt,
      updatedAt: clientFound.updatedAt,
    });
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
    res
     .status(500)
     .json({ succes: false, message: "Error interno del servidor" });
  }
};

export const editClient = async (req, res) => {
    const {id} = req.params; //id del cliente a editar
    const {name, alias, address1, city, region, zipCode, country} = req.body;

    try {
        //Verifica si el cliente existe 
        const clientFound = await Client.findById(id);
        if (!clientFound) {
            return res.status(404).json({message: "Cliente no encontrado"});
        }

        //Actualiza los datos del cliente
       if(name) clientFound.name = name;
        if(alias)clientFound.alias = alias;
        if(address1)clientFound.address1 = address1;
        if(city)clientFound.city = city;
        if(region)clientFound.region = region;
        if(zipCode)clientFound.zipCode = zipCode;
        if(country)clientFound.country = country;

        //Guarda los cambios en la base de datos
        const clientUpdated = await clientFound.save();

        //Envía los datos actualizados al cliente
        res.json({
            id: clientUpdated._id,
            name: clientUpdated.name,
            alias: clientUpdated.alias,
            address1: clientUpdated.address1,
            city: clientUpdated.city,
            region: clientUpdated.region,
            zipCode: clientUpdated.zipCode,
            country: clientUpdated.country,
            updatedAt: clientUpdated.updatedAt,
        });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
