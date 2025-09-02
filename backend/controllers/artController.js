import artModel from '../models/artModel.js';

export const addArt = async (req, res) => {
  try {
    // ensure multer ran and provided file
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image file is required (field name: image)' });
    }

    // sanitize/convert price to Number
    const rawPrice = req.body.price ?? '';
    const cleaned = String(rawPrice).replace(/["',\s]/g, '');
    const price = Number(cleaned);
    if (Number.isNaN(price)) {
      return res.status(400).json({ success: false, message: 'Invalid price value' });
    }

    // Provide 'type' from request, or fallback to category, or a default value
    const typeValue = (req.body.type && String(req.body.type).trim()) ||
                      (req.body.category && String(req.body.category).trim()) ||
                      'General';

    const image_filename = req.file.filename;

    // debug log to confirm file and working directory
    console.log('Saved file:', image_filename, 'cwd=', process.cwd());

    const art = new artModel({
      name: req.body.name ?? '',
      description: req.body.description ?? '',
      price,
      category: req.body.category ?? '',
      type: typeValue,
      image: image_filename,
    });

    await art.save();
    return res.status(201).json({ success: true, message: 'Art item added', art });
  } catch (error) {
    console.error('addArt error:', error);
    return res.status(500).json({ success: false, message: 'Art item add failed', error: error.message });
  }
};

export const listArt = async (req, res) => {
  try {
    const arts = await artModel.find({});

    // build absolute image URL for each item
    const host = `${req.protocol}://${req.get('host')}`;
    const data = arts.map(a => ({
      _id: a._id,
      name: a.name,
      type: a.type,
      price: a.price,
      image: a.image,
      imageUrl: `${host}/images/${a.image}`,
      category: a.category,
      __v: a.__v
    }));

    return res.json({ success: true, data });
  } catch (error) {
    console.error('listArt error:', error);
    return res.status(500).json({ success: false, message: 'Art item list failed', error: error.message });
  }
};