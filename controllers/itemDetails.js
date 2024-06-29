import itemDetailsService from "../services/itemDetails.js";

const getItemDetails = async (req, res) => {
  const item = await itemDetailsService.getItemDetails(req.body.itemId);
  if (item !== null) {
    console.log("controler-details:", item);
    res.json(item);
  } else {
    return res.status(404).send();
  }
};

export { getItemDetails };
