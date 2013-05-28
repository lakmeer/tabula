

pending = 0


# Image Preloader

window.preload-img = (src, λ) ->
  log 'Preload::Load -', src
  pending := pending + 1
  img = new Image
  img.onload = (event) ->
    pending := pending - 1
    if img.natural-width < 1 or img.natural-height < 1
      log 'Preload::NoSize -', src, 'has no dimensions'
      img.onerror?!
      λ img, true
    else
      λ img, false
  img.onerror = -> log 'Preload::Error -', src
  img.src = src


window.preloads-pending = -> log pending


window.preload-img = (src, λ) ->
  img = new Image
  img.src = src

  pending := pending + 1

  $(img).imagesLoaded ($good, $bad, $all) ->
    pending := pending - 1
    λ img, false



# Asset Loader

window.load-images = (images, λ) ->
  total = 0
  img-data = {}

  if not images?
    log 'LoadImages::Empty - no images in supplied list'
    λ? [], {}

  (flip map) images, (img) ->
    preload-img img, (data, err) ->
      img-data[ img ] = data
      total := total + 1

      if total is images.length
        λ? images, img-data

