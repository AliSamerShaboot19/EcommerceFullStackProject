import PageError from '../../components/PageError'

const ProductsCatalogNotFounds = () => {
  return (
    <div className='card bg-error/10 border border-error/20 p-8 text-center rounded-2xl max-w-xl mx-auto my-12'>
      <PageError
        message={
          'We encountered an issue while loading the production catalog.'
        }
        action={{
          onClick: () => window.location.reload(),
          label: 'Try Again'
        }}
      />
    </div>
  )
}

export default ProductsCatalogNotFounds
