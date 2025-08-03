import DataEntry from "../models/DataEntry.js";

export const getAllData = async (req, res) => {
  try {
    const filters = { ...req.query };

    // Convert numbers from query strings
    if (filters.intensity) filters.intensity = Number(filters.intensity);
    if (filters.likelihood) filters.likelihood = Number(filters.likelihood);
    if (filters.relevance) filters.relevance = Number(filters.relevance);

    // Clean empty filters
    Object.keys(filters).forEach((key) => {
      if (!filters[key]) delete filters[key];
    });

    const data = await DataEntry.find(filters);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUniqueFieldValues = async (req, res) => {
  const field = req.params.field;
  try {
    const values = await DataEntry.distinct(field);
    res.json(values.filter(Boolean));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
