CarrierWave.configure do |config|
    config.asset_host = "https://ai-coten.onrender.com"
    if Rails.env.production?
      require 'cloudinary'
      config.storage = :fog
      config.fog_credentials = {
        provider: 'Cloudinary',
        cloudinary_url: ENV['CLOUDINARY_URL']
      }
      config.fog_directory = nil # Cloudinaryでは不要
    else
      config.storage = :file
      config.cache_storage = :file
    end
  end