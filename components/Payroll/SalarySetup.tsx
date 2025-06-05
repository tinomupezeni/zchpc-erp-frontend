import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Plus,
  Search,
  ChevronDown,
  Trash2,
  Edit2,
  Check,
  X,
  Loader,
} from "lucide-react";
import Server from "@/server/Server";
import { formatUSD, formatZIG } from "../ui/utils";
import { toast } from "sonner";

const SalarySetup = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState(null); // Tracks which employee is being edited
  const [formData, setFormData] = useState({
    usd_salary: "",
    zig_salary: "",
    allowances: [],
    deductions: [],
  });
  const [newAllowance, setNewAllowance] = useState({ name: "", amount: "" });
  const [newDeduction, setNewDeduction] = useState({ name: "", amount: "" });

  // Fetch employees on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await Server.fetchEmployees();
      setEmployees(response.data);
    //   console.log(response.data);
    } catch (error) {
      toast.error("Failed to fetch employees");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Filter employees by search term
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.surname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeid?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle edit mode for an employee
  const handleEdit = (employee) => {
    setEditMode(employee.employeeid);
    setFormData({
      usd_salary: employee.usd_salary || "",
      zig_salary: employee.zig_salary || "",
      allowances: employee.allowances || [],
      deductions: employee.deductions || [],
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditMode(null);
    setFormData({
      usd_salary: "",
      zig_salary: "",
      allowances: [],
      deductions: [],
    });
  };

  // Save changes to an employee's salary
  const handleSave = async (employeeId) => {
    if (!formData.baseSalaryUSD || !formData.baseSalaryZIG) {
      toast.error("Base salary (USD/ZIG) is required");
      return;
    }

    setLoading(true);
    try {
      await Server.updateSalary(employeeId, formData);
      toast.success("Salary updated successfully");
      fetchEmployees(); // Refresh data
      setEditMode(null);
    } catch (error) {
      toast.error("Failed to update salary");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new allowance
  const addAllowance = () => {
    if (!newAllowance.name || !newAllowance.amount) {
      toast.error("Allowance name and amount are required");
      return;
    }
    setFormData({
      ...formData,
      allowances: [...formData.allowances, newAllowance],
    });
    setNewAllowance({ name: "", amount: "" });
  };

  // Add a new deduction
  const addDeduction = () => {
    if (!newDeduction.name || !newDeduction.amount) {
      toast.error("Deduction name and amount are required");
      return;
    }
    setFormData({
      ...formData,
      deductions: [...formData.deductions, newDeduction],
    });
    setNewDeduction({ name: "", amount: "" });
  };

  // Remove an allowance/deduction
  const removeItem = (type, index) => {
    const updatedItems = [...formData[type]];
    updatedItems.splice(index, 1);
    setFormData({ ...formData, [type]: updatedItems });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Salary Setup</h1>
          <p className="text-sm text-gray-500">
            Configure base salaries, allowances, and deductions
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Employee Salary Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Base Salary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Allowances
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deductions
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center">
                  <Loader className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                  <p className="mt-2 text-sm text-gray-500">
                    Loading employee data...
                  </p>
                </td>
              </tr>
            ) : filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                        {employee.firstname
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                        {employee.surname
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {employee.firstname} {employee.surname}
                        </div>
                        <div className="text-sm text-gray-500">
                          {employee.position} • {employee.department}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Base Salary */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editMode === employee.employeeid ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">USD</span>
                          <input
                            type="number"
                            className="w-24 px-2 py-1 border rounded"
                            value={formData.usd_salary}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                usd_salary: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">ZIG</span>
                          <input
                            type="number"
                            className="w-24 px-2 py-1 border rounded"
                            value={formData.zig_salary}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                zig_salary: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {formatUSD(employee.usd_salary || 0)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatZIG(employee.zig_salary || 0)}
                        </span>
                      </div>
                    )}
                  </td>

                  {/* Allowances */}
                  <td className="px-6 py-4">
                    {editMode === employee.employeeid ? (
                      <div className="space-y-2">
                        {formData.allowances.map((allowance, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-sm">
                              {allowance.name}: {formatUSD(allowance.amount)}
                            </span>
                            <button
                              onClick={() => removeItem("allowances", index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        <div className="flex gap-2 mt-2">
                          <input
                            type="text"
                            placeholder="Allowance name"
                            className="w-24 px-2 py-1 border rounded text-sm"
                            value={newAllowance.name}
                            onChange={(e) =>
                              setNewAllowance({
                                ...newAllowance,
                                name: e.target.value,
                              })
                            }
                          />
                          <input
                            type="number"
                            placeholder="Amount"
                            className="w-20 px-2 py-1 border rounded text-sm"
                            value={newAllowance.amount}
                            onChange={(e) =>
                              setNewAllowance({
                                ...newAllowance,
                                amount: e.target.value,
                              })
                            }
                          />
                          <button
                            onClick={addAllowance}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {employee.allowances?.length > 0 ? (
                          employee.allowances.map((allowance, index) => (
                            <div key={index} className="text-sm">
                              {allowance.name}: {formatUSD(allowance.amount)}
                            </div>
                          ))
                        ) : (
                          <span className="text-sm text-gray-400">None</span>
                        )}
                      </div>
                    )}
                  </td>

                  {/* Deductions */}
                  <td className="px-6 py-4">
                    {editMode === employee.employeeid ? (
                      <div className="space-y-2">
                        {formData.deductions.map((deduction, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-sm">
                              {deduction.name}: {formatUSD(deduction.amount)}
                            </span>
                            <button
                              onClick={() => removeItem("deductions", index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        <div className="flex gap-2 mt-2">
                          <input
                            type="text"
                            placeholder="Deduction name"
                            className="w-24 px-2 py-1 border rounded text-sm"
                            value={newDeduction.name}
                            onChange={(e) =>
                              setNewDeduction({
                                ...newDeduction,
                                name: e.target.value,
                              })
                            }
                          />
                          <input
                            type="number"
                            placeholder="Amount"
                            className="w-20 px-2 py-1 border rounded text-sm"
                            value={newDeduction.amount}
                            onChange={(e) =>
                              setNewDeduction({
                                ...newDeduction,
                                amount: e.target.value,
                              })
                            }
                          />
                          <button
                            onClick={addDeduction}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {employee.deductions?.length > 0 ? (
                          employee.deductions.map((deduction, index) => (
                            <div key={index} className="text-sm">
                              {deduction.name}: {formatUSD(deduction.amount)}
                            </div>
                          ))
                        ) : (
                          <span className="text-sm text-gray-400">None</span>
                        )}
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editMode === employee.employeeid ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleSave(employee.id)}
                          disabled={loading}
                          className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
                        >
                          {loading ? (
                            <Loader className="h-4 w-4 animate-spin" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm hover:bg-gray-300"
                        >
                          <X className="h-4 w-4" />
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(employee)}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                      >
                        <Edit2 className="h-4 w-4" />
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <DollarSign className="h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No employees found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchTerm
                        ? "Try adjusting your search"
                        : "Add employees to get started"}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalarySetup;
