const baseController = (model, entityName) => ({
  async create(req, res) {
    try {
      const data = await model.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async list(req, res) {
    try {
      const { limit = 10, offset = 0 } = req.query;

      const parsedLimit = parseInt(limit, 10);
      const parsedOffset = parseInt(offset, 10);

      if (isNaN(parsedLimit) || isNaN(parsedOffset)) {
        return res.status(400).json({ message: "Invalid limit or offset" });
      }
      const data = await model.list({
        limit: parsedLimit,
        offset: parsedOffset,
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;
      const data = await model.findById(id);
      if (!data) {
        return res.status(404).json({ message: `${entityName} not found` });
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedData = await model.update(id, req.body);
      if (!updatedData.length) {
        return res.status(404).json({ message: `${entityName} not found` });
      }
      res.status(200).json(updatedData[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;

      const deletedData = await model.softDelete(id);
      if (!deletedData.length) {
        return res.status(404).json({ message: `${entityName} not found` });
      }

      res.status(200).json({ message: `${entityName} deleted successfully` });
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  },
});

module.exports = baseController;
