exports.addChild = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const children = await Children.create({
      username: req.body.username,
      password: hashedPassword,
      
    });

    children.password = undefined;

    res.status(201).json({ children });
  } catch (err) {
    res.status(500).json({ message: "There is an error" });
  }
};
