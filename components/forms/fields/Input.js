"use client";

function Input({
  label,
  type = "text",
  error,
  register,
  registerOptions,
  ...props
}) {
  return (
    <div>
      <label className="py-1 block">
        <span className="text-sm font-medium">{label}</span>
      </label>
      <input
        type={type}
        className="w-full px-3 py-2 text-sm border border-base-content/20 rounded-lg bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        {...register(props.name, registerOptions)}
        {...props}
      />
      {error && <p className="text-error text-sm mt-1">{error.message}</p>}
    </div>
  );
}

export default Input;
