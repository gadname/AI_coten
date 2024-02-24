require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  config.storage = :fog
  config.fog_provider = 'fog/cloudinary'
  config.fog_directory = nil # Cloudinaryではディレクトリは使用しません
  config.fog_credentials = {
    provider: 'Cloudinary',
    cloud_name: ENV['CLOUDINARY_CLOUD_NAME'],
    api_key: ENV['CLOUDINARY_API_KEY'],
    api_secret: ENV['CLOUDINARY_API_SECRET']
  }
end