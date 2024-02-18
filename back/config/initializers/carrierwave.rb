CarrierWave.configure do |config|
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: 'AKIA6N3T5PDTY2H676HC',
      aws_secret_access_key: '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',
      region: 'ap-northeast-1'
    }
    config.fog_directory  = 's3pf'
    config.cache_storage = :fog
end