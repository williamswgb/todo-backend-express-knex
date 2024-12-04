const OrganisationModel = require("../models/organisationModel");

const createOrganisation = async (req, res) => {
  try {
    const { name, description } = req.body;
    const organisation = await OrganisationModel.create({ name, description });
    res.status(201).json(organisation);
  } catch (error) {
    res.status(500).json({ message: "Failed to create organisation", error });
  }
};

const getOrganisation = async (req, res) => {
  try {
    const { id } = req.params;
    const organisation = await OrganisationModel.findById(id);
    if (!organisation) {
      return res.status(404).json({ message: "Organsiation not found" });
    }
    res.status(200).json(organisation);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch organisation", error });
  }
};

const listOrganisations = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;

    const parsedLimit = parseInt(limit, 10);
    const parsedOffset = parseInt(offset, 10);

    if (isNaN(parsedLimit) || isNaN(parsedOffset)) {
      return res.status(400).json({ message: "Invalid limit or offset" });
    }

    // Fetch organisations from the model
    const organisations = await OrganisationModel.list({
      limit: parsedLimit,
      offset: parsedOffset,
    });

    res.status(200).json(organisations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch organisations", error });
  }
};

const updateOrganisation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Validate input
    if (!name && !description) {
      return res
        .status(400)
        .json({ message: "At least one field must be provided for update" });
    }

    const updatedOrganisation = await OrganisationModel.update(id, {
      name,
      description,
    });
    if (!updatedOrganisation.length) {
      return res
        .status(404)
        .json({ message: "Organisation not found or already deleted " });
    }

    res.status(200).json(updatedOrganisation[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to update organisation", error });
  }
};

const deleteOrganisation = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrganisation = await OrganisationModel.softDelete(id);
    if (!deletedOrganisation.length) {
      return res
        .status(404)
        .json({ message: "Organisation not found or already deleted" });
    }

    res.status(200).json({ message: "Organisation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete organisation", error });
  }
};

module.exports = {
  createOrganisation,
  getOrganisation,
  listOrganisations,
  updateOrganisation,
  deleteOrganisation,
};
