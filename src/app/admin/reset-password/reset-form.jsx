"use client";
import { useState, useEffect } from "react";
import { useRouter, notFound } from "next/navigation"; // Note: notFound is a server utility
import { resetPassword, checkIfTokenIsExpired } from "@/server/actions/login";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ResetForm({ token }) {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(null);

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        // Instead of using notFound (which is for server components), use a client-side redirect:
        router.push("/404");
        return;
      }

      try {
        const response = await checkIfTokenIsExpired(token);
        if (response.success) {
          router.push("/404");
        } else {
          setIsValidToken(true);
        }
      } catch (error) {
        router.push("/404");
      }
    };

    validateToken();
  }, [token, router]);

  if (isValidToken === null) return null; // Prevent flickering before validation completes

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const response = await resetPassword({ token, newPassword });

      if (response.success) {
        toast.success("Password updated successfully!");
        router.push("/admin"); // Redirect to login after success
      } else {
        toast.error(response.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Reset Your Password
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              New Password
            </label>
            <Input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Updating..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ResetForm;
