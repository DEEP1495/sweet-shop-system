import { Request, Response } from "express";
import mongoose from "mongoose";
import Sweet from "../models/sweet.model";

/**
 * ADMIN: Add a new sweet
 */
export const addSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await Sweet.create(req.body);
    res.status(201).json(sweet);
  } catch {
    res.status(500).json({ message: "Failed to add sweet" });
  }
};

/**
 * AUTH: Get all sweets
 */
export const getSweets = async (_req: Request, res: Response) => {
  try {
    const sweets = await Sweet.find({});
    res.status(200).json(sweets);
  } catch {
    res.status(500).json({ message: "Failed to fetch sweets" });
  }
};

/**
 * AUTH: Search sweets
 */
export const searchSweets = async (req: Request, res: Response) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const filter: any = {};

    if (name) {
      filter.name = { $regex: name as string, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(filter);
    res.status(200).json(sweets);
  } catch {
    res.status(500).json({ message: "Search failed" });
  }
};

/**
 * ADMIN: Update sweet
 */
export const updateSweet = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid sweet ID" });
    }

    const sweet = await Sweet.findByIdAndUpdate(id, req.body, { new: true });

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.status(200).json(sweet);
  } catch {
    res.status(500).json({ message: "Failed to update sweet" });
  }
};

/**
 * ADMIN: Delete sweet
 */
export const deleteSweet = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid sweet ID" });
    }

    const sweet = await Sweet.findByIdAndDelete(id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.status(200).json({ message: "Sweet deleted successfully" });
  } catch {
    res.status(500).json({ message: "Failed to delete sweet" });
  }
};

/**
 * AUTH: Purchase sweet
 */
export const purchaseSweet = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { quantity = 1 } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid sweet ID" });
    }

    const sweet = await Sweet.findById(id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    sweet.quantity -= Number(quantity);
    await sweet.save();

    res.status(200).json(sweet);
  } catch {
    res.status(500).json({ message: "Purchase failed" });
  }
};

/**
 * ADMIN: Restock sweet
 */
export const restockSweet = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { amount = 1 } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid sweet ID" });
    }

    const sweet = await Sweet.findById(id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    sweet.quantity += Number(amount);
    await sweet.save();

    res.status(200).json(sweet);
  } catch {
    res.status(500).json({ message: "Restock failed" });
  }
};
