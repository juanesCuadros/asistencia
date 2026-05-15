export default function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && <label style={{ display: 'block', marginBottom: '0.5rem' }}>{label}</label>}
      <input 
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: 'var(--radius)',
          border: '1px solid #ccc',
          boxSizing: 'border-box'
        }} 
        {...props} 
      />
    </div>
  );
}