const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      attributes: [
        'id', 'category_name'
    ],
    include: [
        {
            model: Product,
            attributes: [
                'id',
                'product_name',
                'price',
                'stock',
                'category_id'
            ]
        }
    ]
    });
    res.status(200).json(categoryData);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const getOnecategory = await Category.findOne({where: {
      id: req.params.id
  },
  attributes: [
      'id', 'category_name'
  ],
  // be sure to include its associated Products
  include: [
      {
          model: Product,
          attributes: [
              'id',
              'product_name',
              'price',
              'stock',
              'category_id'
          ]
      }
  ]});
    if (!getOnecategory) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(getOnecategory);
  } catch (err) {
    res.status(500).json(err);
    return;
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const CategoryData = await Category.create({category_name: req.body});
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(400).json(err);
    return;
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateCategory[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCategory) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

module.exports = router;
