"use client";

function TextArea({ label, error, register, registerOptions, ...props }) {
  return (
    <div>
      <label className="py-1 block">
        <span className="text-sm font-medium">{label}</span>
      </label>
      <textarea
        className="w-full h-32 px-3 py-2 text-sm border border-base-content/20 rounded-lg bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-y"
        {...register(props.name, registerOptions)}
        {...props}
      />
      {error && <p className="text-error text-sm mt-1">{error.message}</p>}
    </div>
  );
}

export default TextArea;
