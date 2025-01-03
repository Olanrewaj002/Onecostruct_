import Client from "../models/Client.js";

export const registerClient = async (req, res) => {
  try {
    console.log("Received registration data:", req.body);

    const { fullName, email, address, lga, state } = req.body;

 

    const client = new Client({
      fullName,
      email,
      address,
      lga,
      state,
    });

    await client.save();
    res.status(201).json({ message: "Client data submitted successfully." });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).json({
      message: "Error submitting client data.",
      error: error.message,
    });
  }
};

export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();

    if (clients.length === 0) {
      return res.status(404).json({ message: "No clients found." });
    }

    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({
      message: "Error fetching client data.",
      error: error.message,
    });
  }
};