import { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function TextField({ label, id, className = "", ...props }: TextFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-[13px] text-text-muted mb-2">
        {label}
      </label>
      <input
        id={id}
        className={`w-full glass rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/60 outline-none focus:border-emerald/50 transition-colors ${className}`}
        {...props}
      />
    </div>
  );
}
