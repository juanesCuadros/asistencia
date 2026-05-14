export default function Button({ children, loading, ...props }) {
  return (
    <button 
      style={{
        width: '100%',
        padding: '12px',
        backgroundColor: loading ? '#ccc' : 'var(--primary-color)',
        color: 'white',
        border: 'none',
        borderRadius: 'var(--radius)',
        cursor: loading ? 'not-allowed' : 'pointer'
      }}
      disabled={loading}
      {...props}
    >
      {loading ? 'Cargando...' : children}
    </button>
  );
}