"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function UserForm({
  mode = "create",
  initialData = null,
  onSubmit,
  isLoading = false,
  error = "",
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        role: initialData.role || "user",
      });
    }
  }, [mode, initialData]);

  const roleOptions = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
    { value: "editor", label: "Editor" },
    { value: "moderator", label: "Moderator" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-error/10 text-error border border-error/20">
          <span>{error}</span>
        </div>
      )}

      <div className="w-full">
        <label className="py-1 block">
          <span className="text-sm font-medium">
            Name <span className="text-red-500">*</span>
          </span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter full name"
          className={`w-full px-3 py-2 text-sm border rounded-lg bg-base-100 focus:outline-none focus:ring-2 focus:border-primary ${
            errors.name
              ? "border-error focus:ring-error/50"
              : "border-base-content/20 focus:ring-primary/50"
          }`}
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name}</p>
        )}
      </div>

      <div className="w-full">
        <label className="py-1 block">
          <span className="text-sm font-medium">
            Email <span className="text-red-500">*</span>
          </span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          disabled={mode === "edit"}
          className={`w-full px-3 py-2 text-sm border rounded-lg bg-base-100 focus:outline-none focus:ring-2 focus:border-primary ${
            errors.email
              ? "border-error focus:ring-error/50"
              : "border-base-content/20 focus:ring-primary/50"
          } ${mode === "edit" ? "opacity-50 cursor-not-allowed bg-base-200" : ""}`}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      <div className="w-full">
        <label className="py-1 block">
          <span className="text-sm font-medium">
            Role <span className="text-red-500">*</span>
          </span>
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={`w-full px-3 py-2 text-sm border rounded-lg bg-base-100 focus:outline-none focus:ring-2 focus:border-primary ${
            errors.role
              ? "border-error focus:ring-error/50"
              : "border-base-content/20 focus:ring-primary/50"
          }`}
        >
          {roleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.role && (
          <p className="text-xs text-red-500 mt-1">{errors.role}</p>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              {mode === "create" ? "Creating..." : "Updating..."}
            </>
          ) : (
            mode === "create" ? "Create User" : "Update User"
          )}
        </button>

        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => window.history.back()}
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
