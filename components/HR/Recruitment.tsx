import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Loader,
  ChevronDown,
  Filter,
  Download,
  User,
  Briefcase,
  Calendar,
  Mail,
  Phone,
} from "lucide-react";
import { Menu, MenuButton, MenuItem } from "@headlessui/react";

const Recruitment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobListings, setJobListings] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [activeTab, setActiveTab] = useState("jobs");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [departments, setDepartments] = useState(["All Departments"]);
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [showJobEditOptions, setShowJobEditOptions] = useState(false);

  useEffect(() => {
    fetchJobListings();
    fetchCandidates();
    fetchDepartments();
  }, []);

  const fetchJobListings = async () => {
    setLoading(true);
    try {
      // Simulated API call with more realistic data
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              data: [
                {
                  id: 1,
                  title: "Software Engineer",
                  department: "IT",
                  status: "Open",
                  postedDate: "2023-05-15",
                  applicants: 12,
                },
                {
                  id: 2,
                  title: "HR Manager",
                  department: "HR",
                  status: "Closed",
                  postedDate: "2023-04-10",
                  applicants: 8,
                },
                {
                  id: 3,
                  title: "Marketing Specialist",
                  department: "Marketing",
                  status: "Open",
                  postedDate: "2023-06-01",
                  applicants: 5,
                },
                {
                  id: 4,
                  title: "Finance Analyst",
                  department: "Finance",
                  status: "Open",
                  postedDate: "2023-06-15",
                  applicants: 7,
                },
                {
                  id: 5,
                  title: "Customer Support",
                  department: "Operations",
                  status: "Open",
                  postedDate: "2023-06-20",
                  applicants: 15,
                },
              ],
            }),
          1000
        )
      );
      setJobListings(response.data);
    } catch (error) {
      console.error("Error fetching job listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      // Simulated API call with more realistic data
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              data: [
                {
                  id: 1,
                  name: "Tendai Moyo",
                  job: "Software Engineer",
                  status: "Interview",
                  email: "tendai@example.com",
                  phone: "+263771234567",
                  appliedDate: "2023-06-10",
                },
                {
                  id: 2,
                  name: "Rufaro Chikosha",
                  job: "HR Manager",
                  status: "Hired",
                  email: "rufaro@example.com",
                  phone: "+263772345678",
                  appliedDate: "2023-05-20",
                },
                {
                  id: 3,
                  name: "Tatenda Ncube",
                  job: "Marketing Specialist",
                  status: "Pending",
                  email: "tatenda@example.com",
                  phone: "+263773456789",
                  appliedDate: "2023-06-05",
                },
                {
                  id: 4,
                  name: "Farai Mutizwa",
                  job: "Finance Analyst",
                  status: "Rejected",
                  email: "farai@example.com",
                  phone: "+263774567890",
                  appliedDate: "2023-06-18",
                },
                {
                  id: 5,
                  name: "Chiedza Mhike",
                  job: "Customer Support",
                  status: "Shortlisted",
                  email: "chiedza@example.com",
                  phone: "+263775678901",
                  appliedDate: "2023-06-22",
                },
              ],
            }),
          1000
        )
      );
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    // Simulated department fetch
    setDepartments([
      "All Departments",
      "IT",
      "HR",
      "Marketing",
      "Finance",
      "Operations",
    ]);
  };

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "All Departments" ||
      job.department === selectedDepartment;
    const matchesStatus =
      selectedStatus === "All Statuses" || job.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.job.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All Statuses" || candidate.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  const currentCandidates = filteredCandidates.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(
    activeTab === "jobs"
      ? filteredJobs.length / itemsPerPage
      : filteredCandidates.length / itemsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const exportToCSV = () => {
    const headers =
      activeTab === "jobs"
        ? ["Job Title", "Department", "Status", "Posted Date", "Applicants"]
        : [
            "Candidate Name",
            "Applied Job",
            "Status",
            "Email",
            "Phone",
            "Applied Date",
          ];

    const data = activeTab === "jobs" ? filteredJobs : filteredCandidates;

    const csvContent = [
      headers.join(","),
      ...data.map((item) =>
        activeTab === "jobs"
          ? `"${item.title}","${item.department}","${item.status}","${item.postedDate}","${item.applicants}"`
          : `"${item.name}","${item.job}","${item.status}","${item.email}","${item.phone}","${item.appliedDate}"`
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `recruitment_${activeTab}_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Open":
      case "Hired":
      case "Shortlisted":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            {status}
          </span>
        );
      case "Interview":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {status}
          </span>
        );
      case "Pending":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            {status}
          </span>
        );
      case "Closed":
      case "Rejected":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            {status}
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Recruitment Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            {activeTab === "jobs"
              ? `${filteredJobs.length} ${
                  filteredJobs.length === 1 ? "job" : "jobs"
                } found`
              : `${filteredCandidates.length} ${
                  filteredCandidates.length === 1 ? "candidate" : "candidates"
                } found`}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            onClick={() => console.log("Post a Job")}
          >
            <Plus className="h-5 w-5" />
            {activeTab === "jobs" ? "Post a Job" : "Add Candidate"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "jobs"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => {
            setActiveTab("jobs");
            setCurrentPage(1);
          }}
        >
          Job Listings
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "candidates"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => {
            setActiveTab("candidates");
            setCurrentPage(1);
          }}
        >
          Candidates
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder={
                activeTab === "jobs" ? "Search jobs..." : "Search candidates..."
              }
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          {activeTab === "jobs" && (
            <div className="relative">
              <select
                className="appearance-none border rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedDepartment}
                onChange={(e) => {
                  setSelectedDepartment(e.target.value);
                  setCurrentPage(1);
                }}
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          )}
          <div className="relative">
            <select
              className="appearance-none border rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option>All Statuses</option>
              {activeTab === "jobs" ? (
                <>
                  <option>Open</option>
                  <option>Closed</option>
                </>
              ) : (
                <>
                  <option>Pending</option>
                  <option>Shortlisted</option>
                  <option>Interview</option>
                  <option>Hired</option>
                  <option>Rejected</option>
                </>
              )}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === "jobs" ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Job Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Department
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Posted Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Applicants
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center">
                      <Loader className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                      <p className="mt-2 text-sm text-gray-500">
                        Loading job listings...
                      </p>
                    </td>
                  </tr>
                ) : currentJobs.length > 0 ? (
                  currentJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {job.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {job.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(job.postedDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="font-medium">{job.applicants}</span>{" "}
                        applicants
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(job.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Menu
                          as="div"
                          className="relative inline-block text-left"
                        >
                          <div>
                            <MenuButton className="inline-flex justify-center w-full rounded-md px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none" onClick={() => setShowJobEditOptions(!showJobEditOptions)}>
                              <MoreVertical className="h-5 w-5 text-gray-400" />
                            </MenuButton>
                          </div>
                          {showJobEditOptions && (
                            <Menu
                              as="div"
                              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                            >
                              <MenuItem>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700"
                                    } group flex items-center w-full px-4 py-2 text-sm`}
                                  >
                                    View Details
                                  </button>
                                )}
                              </MenuItem>
                              <MenuItem>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700"
                                    } group flex items-center w-full px-4 py-2 text-sm`}
                                  >
                                    Edit Job
                                  </button>
                                )}
                              </MenuItem>
                              <MenuItem>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700"
                                    } group flex items-center w-full px-4 py-2 text-sm`}
                                  >
                                    View Applicants
                                  </button>
                                )}
                              </MenuItem>
                              <MenuItem>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700"
                                    } group flex items-center w-full px-4 py-2 text-sm`}
                                  >
                                    {job.status === "Open"
                                      ? "Close Job"
                                      : "Reopen Job"}
                                  </button>
                                )}
                              </MenuItem>
                            </Menu>
                          )}
                        </Menu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Briefcase className="h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                          No job listings found
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {searchTerm
                            ? "Try adjusting your search or filter"
                            : "Post a new job to get started"}
                        </p>
                        {!searchTerm && (
                          <button
                            type="button"
                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                            onClick={() => console.log("Post a Job")}
                          >
                            <Plus className="-ml-1 mr-2 h-5 w-5" />
                            Post a Job
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredJobs.length > itemsPerPage && (
            <div className="px-6 py-4 border-t flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredJobs.length)}
                </span>{" "}
                of <span className="font-medium">{filteredJobs.length}</span>{" "}
                results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-3 py-1 rounded-md border ${
                        currentPage === number
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {number}
                    </button>
                  )
                )}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Candidate
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Applied Job
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Applied Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center">
                      <Loader className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                      <p className="mt-2 text-sm text-gray-500">
                        Loading candidates...
                      </p>
                    </td>
                  </tr>
                ) : currentCandidates.length > 0 ? (
                  currentCandidates.map((candidate) => (
                    <tr key={candidate.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                            {candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {candidate.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {candidate.job}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <Mail className="h-4 w-4" /> {candidate.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="h-4 w-4" /> {candidate.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(candidate.appliedDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(candidate.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Menu
                          as="div"
                          className="relative inline-block text-left"
                        >
                          <div>
                            <MenuButton className="inline-flex justify-center w-full rounded-md px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none">
                              <MoreVertical className="h-5 w-5 text-gray-400" />
                            </MenuButton>
                          </div>
                          <Menu
                            as="div"
                            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                          >
                            <MenuItem>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                  } group flex items-center w-full px-4 py-2 text-sm`}
                                >
                                  View Profile
                                </button>
                              )}
                            </MenuItem>
                            <MenuItem>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                  } group flex items-center w-full px-4 py-2 text-sm`}
                                >
                                  Schedule Interview
                                </button>
                              )}
                            </MenuItem>
                            <MenuItem>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                  } group flex items-center w-full px-4 py-2 text-sm`}
                                >
                                  Update Status
                                </button>
                              )}
                            </MenuItem>
                            <MenuItem>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                  } group flex items-center w-full px-4 py-2 text-sm`}
                                >
                                  Download CV
                                </button>
                              )}
                            </MenuItem>
                          </Menu>
                        </Menu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <User className="h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                          No candidates found
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {searchTerm
                            ? "Try adjusting your search or filter"
                            : "No candidates have applied yet"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredCandidates.length > itemsPerPage && (
            <div className="px-6 py-4 border-t flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredCandidates.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium">{filteredCandidates.length}</span>{" "}
                results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-3 py-1 rounded-md border ${
                        currentPage === number
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {number}
                    </button>
                  )
                )}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recruitment Metrics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Recruitment Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="text-sm font-medium text-blue-800">
              Open Positions
            </div>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {jobListings.filter((job) => job.status === "Open").length}
            </div>
            <div className="text-xs text-blue-500 mt-2">Currently hiring</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="text-sm font-medium text-green-800">
              Total Applicants
            </div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {candidates.length}
            </div>
            <div className="text-xs text-green-500 mt-2">All time</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="text-sm font-medium text-purple-800">
              Interview Stage
            </div>
            <div className="text-2xl font-bold text-purple-600 mt-1">
              {candidates.filter((c) => c.status === "Interview").length}
            </div>
            <div className="text-xs text-purple-500 mt-2">
              Currently in process
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <div className="text-sm font-medium text-yellow-800">
              Hiring Rate
            </div>
            <div className="text-2xl font-bold text-yellow-600 mt-1">
              {jobListings.length > 0
                ? Math.round(
                    (jobListings.filter((job) => job.status === "Closed")
                      .length /
                      jobListings.length) *
                      100
                  )
                : 0}
              %
            </div>
            <div className="text-xs text-yellow-500 mt-2">Positions filled</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recruitment;
