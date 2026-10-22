import { useAdminProducts } from '../hooks/useAdmin'
import { Navigate } from 'react-router'
import { PackageIcon, PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { getOptimizedImageUrl } from '../lib/imageKitUrl'
import { formatPrice } from '../utils/format'
import { AdminProductForm } from '../components/AdminForm'

const AdminPage = () => {
  const {
    editing,
    meData,
    getToken,
    openModal,
    setEditing,
    setOpenModal,
    products,
    saveMutation,
    deleteMutation,
    isLoading
  } = useAdminProducts()

  if (meData && meData.user?.role !== 'admin') {
    return <Navigate to={'/'} replace />
  }

  function handleDleteProduct (product) {
    if (!window.confirm(`Delete ${product.name} ??`)) return
    deleteMutation.mutate(product.id)
  }

  return (
    <div
      data-theme='night'
      className='min-h-screen  text-base-content p-4 md:p-8'
    >
      <div className='max-w-7xl mx-auto space-y-6'>
        <div className='navbar bg-base-100 rounded-box shadow-xl px-4 py-3 flex flex-col sm:flex-row gap-4 justify-between items-center'>
          <div className='flex items-center gap-3'>
            <div className='p-3 bg-primary/10 text-primary rounded-xl'>
              <PackageIcon className='w-6 h-6' aria-hidden />
            </div>
            <div>
              <h1 className='text-2xl font-bold tracking-tight'>Products</h1>
              <p className='text-xs text-base-content/60 hidden sm:block'>
                Manage your catalog inventory
              </p>
            </div>
          </div>
          <button
            type='button'
            className='btn btn-primary w-full sm:w-auto shadow-lg '
            onClick={() => {
              setEditing(null)
              setOpenModal(true)
            }}
          >
            <PlusIcon className='w-5 h-5' /> Add product
          </button>
        </div>

        {isLoading ? (
          <div className='card bg-base-100 shadow-xl p-8 flex flex-col gap-4'>
            <div className='skeleton h-8 w-48 bg-base-200'></div>
            <div className='skeleton h-12 w-full bg-base-200'></div>
            <div className='skeleton h-12 w-full bg-base-200'></div>
            <div className='skeleton h-12 w-full bg-base-200'></div>
            <div className='skeleton h-12 w-full bg-base-200'></div>{' '}
            <div className='skeleton h-12 w-full bg-base-200'></div>{' '}
            <div className='skeleton h-12 w-full bg-base-200'></div>{' '}
            <div className='skeleton h-12 w-full bg-base-200'></div>{' '}
            <div className='skeleton h-12 w-full bg-base-200'></div>
          </div>
        ) : (
          <div className='card bg-base-100 shadow-xl overflow-hidden border border-base-200/50'>
            <div className='overflow-x-auto'>
              <table className='table table-zebra w-full vertical-middle'>
                <thead>
                  <tr className='bg-base-200/50 text-base-content/70'>
                    <th className='rounded-tl-lg'>Preview</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Slug</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th className='rounded-tr-lg text-right'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr
                      key={p.id}
                      className='hover:bg-base-200/40 transition-colors'
                    >
                      <td>
                        <div className='avatar placeholder'>
                          <div className='w-12 h-12 rounded-xl bg-neutral text-neutral-content ring-1 ring-base-content/10 overflow-hidden'>
                            {p.imageUrl ? (
                              <img
                                src={getOptimizedImageUrl(p.imageUrl, 70)}
                                alt={p.name}
                                loading='lazy'
                                decoding='async'
                                className='object-cover'
                              />
                            ) : (
                              <PackageIcon className='w-6 h-6 opacity-40' />
                            )}
                          </div>
                        </div>
                      </td>
                      <td className='font-semibold text-base-content max-w-50 truncate'>
                        {p.name}
                      </td>
                      <td>
                        <span className='font-medium'>{p.category}</span>
                      </td>
                      <td className='text-sm font-mono text-base-content/60 max-w-37.5 truncate'>
                        {p.slug}
                      </td>
                      <td className='font-bold text-secondary'>
                        {formatPrice(p.price, p.currency)}
                      </td>
                      <td>
                        {p.active ? (
                          <span className='badge badge-success badge-sm gap-1 py-2.5 font-medium'>
                            Active
                          </span>
                        ) : (
                          <span className='badge badge-ghost bg-base-200 text-base-content/40 badge-sm gap-1 py-2.5 font-medium'>
                            Inactive
                          </span>
                        )}
                      </td>
                      <td>
                        <div className='flex gap-2 justify-end'>
                          <button
                            type='button'
                            className='btn btn-square btn-sm btn-ghost hover:btn-info text-base-content/70 hover:text-info-content'
                            onClick={() => {
                              setEditing(p)
                              setOpenModal(true)
                            }}
                          >
                            <PencilIcon className='w-4 h-4' />
                          </button>
                          <button
                            type='button'
                            className='btn btn-square btn-sm btn-ghost hover:btn-error text-error'
                            disabled={
                              deleteMutation.isPending &&
                              deleteMutation.variables === p.id
                            }
                            onClick={() => handleDleteProduct(p)}
                          >
                            {deleteMutation.isPending &&
                            deleteMutation.variables === p.id ? (
                              <span className='loading loading-spinner loading-xs' />
                            ) : (
                              <Trash2Icon className='w-4 h-4' />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <dialog
          className={`modal ${
            openModal ? 'modal-open' : ''
          } modal-bottom sm:modal-middle backdrop-blur-sm`}
        >
          <div className='modal-box bg-base-100 border border-base-200 max-w-lg'>
            <h3 className='font-bold text-xl mb-6 text-base-content border-b border-base-200 pb-3'>
              {editing ? 'Edit Product' : 'New Product'}
            </h3>
            <AdminProductForm
              key={editing?.id ?? 'new'}
              initial={editing}
              saving={saveMutation.isPending}
              error={saveMutation.isError}
              getToken={getToken}
              onCancel={() => {
                setOpenModal(false)
                setEditing(null)
              }}
              onSubmit={body => saveMutation.mutate({ body, id: editing?.id })}
            />
            <button
              type='button'
              className='btn btn-sm btn-circle btn-ghost absolute right-4 top-4'
              onClick={() => {
                setOpenModal(false)
                setEditing(null)
              }}
            >
              ✕
            </button>
          </div>
          <div
            className='modal-backdrop'
            onClick={() => {
              setOpenModal(false)
              setEditing(null)
            }}
          >
            <button>close</button>
          </div>
        </dialog>
      </div>
    </div>
  )
}

export default AdminPage
