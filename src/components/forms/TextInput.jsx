export default function TextInput({ label, ...props }) {
  return (
    <label className="search-box">
      <span>{label}</span>
      <input {...props} />
    </label>
  );
}
