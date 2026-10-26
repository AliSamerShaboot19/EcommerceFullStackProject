import { useState } from 'react'

import { getOptimizedImageUrl } from '../lib/imageKitUrl.js'
import { uploadImageKit } from '../lib/imageKitUpload.js'
import UploadImageError from '../ui/errors/UploadImageError.jsx'
import Uploaderror from '../ui/errors/Uploaderror.jsx'

export function AdminProductForm ({
  initial,
  saving,
  error,
  getToken,
  onCancel,
  onSubmit
}) {
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [name, setName] = useState(initial?.name ?? '')
  const [category, setCategory] = useState(initial?.category ?? 'General')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [priceCents, setPriceCents] = useState(
    initial ? String(initial.price / 100) : ''
  )
  const [currency, setCurrency] = useState(initial?.currency ?? 'usd')
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? '')
  const [imageKitField, setImageKitFileId] = useState(
    initial?.imageKitField ?? ''
  )
  const [active, setActive] = useState(initial?.active ?? true)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadError, setUploadError] = useState(null)

  function handleSubmit (e) {
    e.preventDefault()
    const dollars = Number.parseFloat(priceCents)
    if (Number.isNaN(dollars) || dollars <= 0) return

    const body = {
      slug: slug.trim(),
      name: name.trim(),
      category: category.trim() || 'General',
      description: description.trim(),
      priceCents: Math.round(dollars * 100),
      currency: currency.trim().toLowerCase(),
      imageUrl: imageUrl.trim() || null,
      imageKitField: imageKitField.trim() || null,
      active
    }

    if (initial) {
      const patch = {}
      if (body.name !== initial.name) patch.name = body.name
      if (body.category !== (initial.category ?? 'General'))
        patch.category = body.category
      if (body.description !== initial.description)
        patch.description = body.description
      if (body.priceCents !== initial.priceCents) patch.priceCents = body.priceCents
      if (body.currency !== initial.currency) patch.currency = body.currency
      if ((body.imageUrl ?? '') !== (initial.imageUrl ?? ''))
        patch.imageUrl = body.imageUrl
      if ((body.imageKitField ?? null) !== (initial.imageKitField ?? null)) {
        patch.imageKitField = body.imageKitField
      }
      if (body.active !== initial.active) patch.active = body.active
      if (Object.keys(patch).length === 0) {
        onCancel()
        return
      }
      onSubmit(patch)
    } else {
      onSubmit(body)
    }
  }

  async function handleImageUpload (e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    setUploadError(null)

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File is too large (max 10MB).')
      return
    }

    const ext = file.name.includes('.')
      ? file.name.slice(file.name.lastIndexOf('.'))
      : '.jpg'
    const base = (slug.trim() || 'product')
      .replace(/[^\w-]+/g, '-')
      .slice(0, 80)

    setUploadingImage(true)

    try {
      const { url, fileId } = await uploadImageKit(file, getToken, {
        fileName: `${base}-${Date.now()}${ext}`
      })

      setImageUrl(url)
      setImageKitFileId(fileId ?? '')
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploadingImage(false)
    }
  }

  return (
    <form
      className='flex flex-col gap-5 text-base-content'
      onSubmit={handleSubmit}
    >
      <div className='form-control w-full'>
        <label className='label py-1'>
          <span className='label-text font-semibold text-base-content/80'>
            Slug
          </span>
        </label>
        <input
          className='input input-bordered w-full bg-base-200/50 focus:input-primary transition-all font-mono text-sm'
          value={slug}
          onChange={e => setSlug(e.target.value)}
          required
          disabled={Boolean(initial)}
          placeholder='unique-product-identifier'
        />
      </div>

      <div className='form-control w-full'>
        <label className='label py-1'>
          <span className='label-text font-semibold text-base-content/80'>
            Name
          </span>
        </label>
        <input
          className='input input-bordered w-full bg-base-200/50 focus:input-primary transition-all'
          value={name}
          onChange={e => setName(e.target.value)}
          required
          placeholder='Product listing name'
        />
      </div>

      <div className='form-control w-full'>
        <label className='label py-1'>
          <span className='label-text font-semibold text-base-content/80'>
            Category
          </span>
        </label>
        <input
          className='input input-bordered w-full bg-base-200/50 focus:input-primary transition-all'
          value={category}
          onChange={e => setCategory(e.target.value)}
          placeholder='e.g. Audio, Workspace'
          required
        />
      </div>

      <div className='form-control w-full'>
        <label className='label py-1'>
          <span className='label-text font-semibold text-base-content/80'>
            Description
          </span>
        </label>
        <textarea
          className='textarea textarea-bordered h-28 w-full bg-base-200/50 focus:textarea-primary transition-all resize-none'
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder='Write deep product descriptions here...'
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='form-control w-full'>
          <label className='label py-1'>
            <span className='label-text font-semibold text-base-content/80'>
              Price (USD)
            </span>
          </label>
          <input
            className='input input-bordered w-full bg-base-200/50 focus:input-neutral transition-all'
            type='number'
            step='0.01'
            min='0.01'
            value={priceCents}
            onChange={e => setPriceCents(e.target.value)}
            required
            placeholder='0.00'
          />
        </div>

        <div className='form-control w-full'>
          <label className='label py-1'>
            <span className='label-text font-semibold text-base-content/80'>
              Currency
            </span>
          </label>
          <input
            className='input input-bordered w-full bg-base-200/50 focus:input-primary transition-all font-mono uppercase'
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            required
            placeholder='USD'
          />
        </div>
      </div>

      <div className='form-control w-full border border-base-200 bg-base-200/20 rounded-xl p-4 space-y-3'>
        <label className='label p-0'>
          <span className='label-text font-semibold text-base-content/80'>
            Product Assets
          </span>
        </label>

        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-base-100 p-3 rounded-lg border border-base-200'>
          <div className='flex flex-col'>
            <span className='text-xs font-medium'>Cloud Media Upload</span>
            <span className='text-[11px] text-base-content/50 mt-0.5'>
              PNG, JPG, WebP, GIF up to 10MB
            </span>
          </div>

          <label className='relative'>
            <span
              className={`btn btn-sm px-4 ${
                uploadingImage ? 'btn-disabled' : 'btn-secondary shadow-sm'
              }`}
            >
              {uploadingImage ? (
                <span className='loading loading-spinner loading-xs' />
              ) : (
                'Upload Image'
              )}
            </span>
            <input
              type='file'
              accept='image/png,image/jpeg,image/webp,image/gif'
              className='hidden'
              disabled={uploadingImage || saving}
              onChange={handleImageUpload}
            />
          </label>
        </div>

        <div className='form-control w-full'>
          <label className='label py-1'>
            <span className='label-text-alt text-base-content/60 font-medium'>
              Direct Asset URL Link
            </span>
          </label>
          <input
            className='input input-bordered input-sm w-full bg-base-100 focus:input-primary transition-all text-sm'
            type='url'
            value={imageUrl}
            onChange={e => {
              const v = e.target.value
              if (v !== imageUrl) setImageKitFileId('')
              setImageUrl(v)
            }}
            placeholder='https://your-domain.com'
          />
        </div>

        {uploadError && <Uploaderror uploadError={uploadError} />}

        {imageUrl ? (
          <div className='relative mt-2 overflow-hidden rounded-lg border border-base-300 bg-base-100 p-3 ring-1 ring-base-content/5 group'>
            <img
              src={getOptimizedImageUrl(imageUrl, 100)}
              alt='Product Preview'
              className='mx-auto max-h-36 w-auto object-contain rounded'
              decoding='async'
            />
            <div className='absolute top-2 right-2 badge badge-neutral bg-base-300/80 backdrop-blur-md text-[10px] text-base-content/70 border-none px-2 py-1.5'>
              Live Preview
            </div>
          </div>
        ) : null}
      </div>

      <div className='form-control bg-base-200/40 border border-base-200/60 rounded-xl px-4 py-3 hover:bg-base-200/70 transition-all'>
        <label className='label cursor-pointer justify-between gap-3 p-0 select-none'>
          <div className='flex flex-col'>
            <span className='label-text font-semibold text-base-content/80'>
              Visibility Status
            </span>
            <span className='text-xs text-base-content/50 mt-0.5'>
              Visible to buyers in your storefront catalogs
            </span>
          </div>
          <input
            type='checkbox'
            className='toggle toggle-primary toggle-md shadow-inner'
            checked={active}
            onChange={e => setActive(e.target.checked)}
          />
        </label>
      </div>

      {error && <UploadImageError />}

      <div className='modal-action gap-2 border-t border-base-200 pt-4 mt-2'>
        <button type='button' className='btn btn-ghost px-5' onClick={onCancel}>
          Cancel
        </button>
        <button
          type='submit'
          className='btn btn-primary min-w-25 shadow-lg shadow-primary/20'
          disabled={saving || uploadingImage}
        >
          {saving ? (
            <span className='loading loading-spinner loading-sm' />
          ) : (
            'Save Product'
          )}
        </button>
      </div>
    </form>
  )
}
