function Error({ statusCode }) {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center', 
      fontFamily: 'sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h1 style={{ marginBottom: '20px' }}>
        {statusCode
          ? `Error ${statusCode} - Algo salió mal en el servidor`
          : 'Error - Algo salió mal en el cliente'}
      </h1>
      <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
        Lo sentimos, ha ocurrido un error al mostrar MicroFlashcards.
      </p>
      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Recargar la página
        </button>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error