import Property from "../models/Property.js";

// Create a new property
export const createProperty = async (req, res) => {
  try {
    const { name, address, location, equity, duration } = req.body;

    // Handle file upload (if using a library like multer)
    const image = req.file ? req.file.path : null;

    const newProperty = new Property({
      name,
      address,
      location,
      equity,
      duration,
      image,
    });

    await newProperty.save();

    res.status(201).json({
      message: "Property created successfully",
      property: newProperty,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating property", error });
  }
};
// Get all properties
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error });
  }
};
export const updateProperty = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedProperty = await Property.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: "Failed to update property", error });
  }
};

// Delete property
export const deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProperty = await Property.findByIdAndDelete(id);
    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete property", error });
  }
};