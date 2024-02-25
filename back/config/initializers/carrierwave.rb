require 'cloudinary'
CarrierWave.configure do |config|
  # config.asset_host = "https://ai-coten.onrender.com"
  config.storage = :cloudinary
  config.cache_storage = :file
end