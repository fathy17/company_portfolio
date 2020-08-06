if (process.env.NODE_ENV === "production") {
  module.exports = () => ({
    upload: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: "mvrsn17",
        api_key: "558522617611913",
        api_secret: "_FN5I_TqXIHrWrbsYBvWXHq2CBo",
      },
    },
  });
} else {
  // to use the default local provider you can return an empty configuration
  module.exports = {};
}
