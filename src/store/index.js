import { defineStore } from 'pinia'

export const useStore = defineStore('counter', {
  state: () => ({
    EditData: {
      PersonalDetails: null,
      BankDetails: null,
      ProfessionalDetails: null,
      EducationalDetails: [],
      ExperienceDetails: [],
      CurrentOrganizationDetails: null
    },
    Data: [],
    AllData: [],
    editingItem: null,
    isEditing: false,
    editingIndex: null,
    headers: [
      {
        title: "Profile Picture",
        align: "center",
        sortable: false,
        key: "Profile",
      },

      { title: "Name", align: "center", key: "Name" },
      { title: "Department", align: "center", key: "Department" },
      { title: "Designation ", align: "center", key: "Designation" },
      { title: "Email ", align: "center", key: "Email" },
      { title: "Mobile Number ", align: "center", key: "Number" },
      { title: "Resume ", align: "center", key: "Resume" },
      { title: "Actions", align: "center", key: "actions", sortable: false },
    ]
  }),
  actions: {
    showData() {
      return JSON.parse(localStorage.getItem("Data")) || [];
    },
    editingData() {
      const FullData = JSON.parse(localStorage.getItem("AllData"));
      const matchedUser = FullData.find(
        (user) => user.PersonalDetails.email === this.editingItem.Email && user.PersonalDetails.number === this.editingItem.Number
      );
      return matchedUser
    },
    setAllData() {
      this.AllData = JSON.parse(localStorage.getItem("AllData")) || [],
        this.AllData.push(this.EditData)
      localStorage.setItem("AllData", JSON.stringify(this.AllData));
    },
    resetEditData() {
      this.EditData.PersonalDetails = null,
        this.EditData.BankDetails = null,
        this.EditData.ProfessionalDetails = null,
        this.EditData.EducationalDetails = [],
        this.EditData.ExperienceDetails = [],
        this.EditData.CurrentOrganizationDetails = null
    },

    setValues() {
      const user = {
        Name: this.EditData.PersonalDetails.firstname + " " + this.EditData.PersonalDetails.lastname,
        Department: this.EditData.ProfessionalDetails.department,
        Designation: this.EditData.ProfessionalDetails.designation,
        Email: this.EditData.PersonalDetails.email,
        Number: this.EditData.PersonalDetails.number
      }
      this.Data = JSON.parse(localStorage.getItem("Data")) || [],
        this.Data.push(user)
      localStorage.setItem("Data", JSON.stringify(this.Data));
      this.resetEditData()
    },
    deletingData(index) {
      this.Data.splice(index, 1);
      this.AllData.splice(index, 1);
      localStorage.setItem("Data", JSON.stringify(this.Data));
      localStorage.setItem("AllData", JSON.stringify(this.Data));
    },
    setEditedData() {
      this.AllData = JSON.parse(localStorage.getItem("AllData")) || [];
      this.AllData.splice(this.editedIndex, 1);
      this.AllData.push(this.EditData);
      localStorage.setItem("AllData", JSON.stringify(this.AllData));
      this.Data.splice(this.editedIndex, 1);
      const user = {
        Name:
          this.EditData.PersonalDetails.firstname +
          " " +
          this.EditData.PersonalDetails.lastname,
        Department: this.EditData.ProfessionalDetails.department,
        Designation: this.EditData.ProfessionalDetails.designation,
        Email: this.EditData.PersonalDetails.email,
        Number: this.EditData.PersonalDetails.number,
      };
      this.Data = JSON.parse(localStorage.getItem("Data")) || [];
      this.Data.splice(this.editedIndex, 1);
      this.Data.push(user);
      localStorage.setItem("Data", JSON.stringify(this.Data));
      this.resetEditData()
    }
  },
})
