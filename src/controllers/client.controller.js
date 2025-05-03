import Client from "../models/client.model.js";

export const registerClient = async (req, res) => {
  const {
    clientCode,
    companyName,
    Rfc,
    interiorNumber,
    externalNumber,
    street,
    suburb,
    zipCode,
    city,
    municipality,
    state,
    eMail,
  } = req.body;

  try {
    const clientFound = await Client.findOne({ clientCode });
    if (clientFound)
      return res.status(409).json({ message: "Client already exists" });

    const newClient = new Client({
      clientCode,
      companyName,
      Rfc,
      interiorNumber,
      externalNumber,
      street,
      suburb,
      zipCode,
      city,
      municipality,
      state,
      eMail,
    });

    const clientSaved = await newClient.save();

    return res
      .status(200)
      .json({ message: "El cliente se creo correctamente" });
    // res.json({
    //   id: clientSaved._id,
    //   name: clientSaved.name,
    //   alias: clientSaved.alias,
    //   address1: clientSaved.address1,
    //   city: clientSaved.city,
    //   region: clientSaved.region,
    //   zipCode: clientSaved.zipCode,
    //   country: clientSaved.country,
    //   createdAt: clientSaved.createdAt,
    //   updateAt: clientSaved.updatedAt,
    // });
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
  const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!client)
    return res.status(404).json({ message: "Cliente no encontrado" });
  res.json(client);
};

export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    //Buscar la orden de trabajo mediante el ID
    const client = await Client.findById(id);

    //Si no se encuentra el cliente, responde un error 404
    if (!client)
      return res.status(404).json({ message: "Cliente no encontrado" });

    //Si el cliente se encuentra, elimina el cliente de la base de datos
    await Client.findByIdAndDelete(id);

    res.json({ message: "Cliente eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    res
      .status(500)
      .json({ succes: false, message: "Error interno del servidor" });
  }
};
