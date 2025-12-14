import { Request, Response } from "express";
import Sweet from "../models/sweet.model";

export const addSweet = async (req: Request, res: Response) => {
  const sweet = await Sweet.create(req.body);
  res.status(201).json(sweet);
};

export const getSweets = async (req: Request, res: Response) => {
  const sweets = await Sweet.find({});
  res.json(sweets);
};

export const searchSweets = async (req: Request, res: Response) => {
  const { name, category, minPrice, maxPrice } = req.query;

  const filter: any = {};

  if (name) filter.name = new RegExp(name as string, "i");
  if (category) filter.category = category;
  if (minPrice || maxPrice) {
    filter.price = {
      $gte: Number(minPrice) || 0,
      $lte: Number(maxPrice) || 99999
    };
  }

  const sweets = await Sweet.find(filter);
  res.json(sweets);
};

export const updateSweet = async (req: Request, res: Response) => {
  const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(sweet);
};

export const deleteSweet = async (req: Request, res: Response) => {
  await Sweet.findByIdAndDelete(req.params.id);
  res.json({ message: "Sweet deleted" });
};

export const purchaseSweet = async (req: Request, res: Response) => {
  const sweet = await Sweet.findById(req.params.id);

  if (!sweet) return res.status(404).json({ message: "Sweet not found" });
  if (sweet.quantity <= 0) return res.status(400).json({ message: "Out of stock" });

  sweet.quantity -= 1;
  await sweet.save();

  res.json(sweet);
};

export const restockSweet = async (req: Request, res: Response) => {
  const { amount } = req.body;
  const sweet = await Sweet.findById(req.params.id);

  if (!sweet) return res.status(404).json({ message: "Sweet not found" });

  sweet.quantity += Number(amount || 1);
  await sweet.save();

  res.json(sweet);
};
