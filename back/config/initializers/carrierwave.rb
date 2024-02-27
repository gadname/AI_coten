CarrierWave.configure do |config|
  config.asset_host = "https://ai-coten.onrender.com"#アップロードされたファイルのURLを指定
  config.storage = :file #local環境を指定
  config.cache_storage = :file #local環境を指定
end