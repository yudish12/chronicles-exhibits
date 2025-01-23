"use client"
import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import InputFile from "@/components/ui/input-file"
import { contactUsForm } from "@/server/actions/forms"
import { toast } from "sonner"
import { usePathname } from "next/navigation"
import { getPageFieldsByName } from "@/utils"

const EnquiryForm = () => {
  const [files, setFiles] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const path = usePathname();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phoneNumber: "",
    budget: "",
    message: "",
  })
  const obj = getPageFieldsByName(path)

  const { name, email, phoneNumber, message, budget } = formData

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const onFileChange = (files) => {
    setFiles(files)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()

      files.forEach((file) => {
        formData.append("files", file)
      })

      formData.append("name", name)
      formData.append("email", email)
      formData.append("phone", phoneNumber)
      formData.append("message", message)
      formData.append("budget", budget)

      const resp = await contactUsForm(formData)

      if (!resp.success) {
        toast.error("Error submitting form. Please try again later.")
        return
      }

      toast.success("Enquiry submitted successfully.")
      setLoading(false)
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        budget: "",
        message: "",
      })
      setFiles([])
    } catch (error) {
      console.log(error)
      toast.error("Failed to submit form. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us Your Enquiry</h2>
      <p className="text-gray-600 mb-8">
        Looking for a brilliant partner for trade show booth design and construction? Fill out the form below, and we&apos;ll
        get back to you shortly!
      </p>
      <div className="space-y-4">
        <Input
          value={name}
          onChange={handleChange}
          required
          name="name"
          placeholder="Enter your name"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent"
        />
        <Input
          value={email}
          onChange={handleChange}
          required
          name="email"
          type="email"
          placeholder="Email ID"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent"
        />
        <Input
          value={phoneNumber}
          onChange={handleChange}
          required
          type="number"
          name="phoneNumber"
          placeholder="Phone Number"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent"
        />
        <Input
          value={budget}
          onChange={handleChange}
          required
          name="budget"
          placeholder="Budget"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent"
        />
        <textarea
          rows={4}
          value={message}
          onChange={handleChange}
          required
          name="message"
          placeholder="Additional information that you would like to add..."
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent"
        ></textarea>
        <InputFile value={files} onChange={onFileChange} />
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={loading}
          className="bg-secondary hover:bg-secondary-dark text-white font-bold text-lg px-8 py-3 rounded-md transition-all duration-300 transform hover:scale-105"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
          ) : (
            "Submit your enquiry"
          )}
        </Button>
      </div>
    </form>
  )
}

export default EnquiryForm

