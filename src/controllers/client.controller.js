import Client from "../models/client.model.js";

export const registerClient = async (req, res) => {
    const { name, alias, address1, address2, city, region, zipCode, country } = req.body;

    try {
        const clientFound = await Client.findOne({name})
        if(clientFound)
            return res.status(409).json({message: "Client already exists"});

        const newClient = new Client({
            name,
            alias,
            address1,
            address2,
            city,
            region,
            zipCode,
            country
        });

        const clientSaved = await newClient.save();

        res.json({
            id: clientSaved._id,
            name: clientSaved.name,
            alias: clientSaved.alias,
            address1: clientSaved.address1,
            address2: clientSaved.address2,
            city: clientSaved.city,
            region: clientSaved.region,
            zipCode: clientSaved.zipCode,
            country: clientSaved.country
        })
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getClients = async (req, res) =>{
    try {
        //Obtiene todos los clientes de la base de datos y los guarda en una constante. 
        const clients = await Client.find({})

        //Envía la lista de usuarios a la api del front en formato JSON.
        res.status(200).json(clients)
    } catch (error) {
        console.error("Erros al obtener los clientes:", error);
        res.status(500).json({succes:false, message: "Error interno del servidor"})
    }       
}