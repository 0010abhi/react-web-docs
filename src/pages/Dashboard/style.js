import { makeStyles } from "@material-ui/core/styles";

export const dashboardStyles = makeStyles((theme)=>({
  table: {
    // minWidth: 650,
    marginBottom: "12px",
  },
  backdrop: {
    zIndex: 999,
    color: '#fff',
  },
  dashboardContainer: {
    display: "flex",
    flexDirection: "column",
  },
  dashboardSaveCancel: {
    position: "sticky",
    display: "flex",
    justifyContent: "flex-end",
    background: "#f4f4f4",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50px",
    padding: "25px",
  },
  editCancel: {
    marginRight: "15px",
  },
  editRow: {
    background: "#E8EDFF",
  },
  editContainer: {
    padding: "25px",
  },
  inputChange: {
    marginTop: "25px",
  },
  inputSubmit: {
    marginTop: "15px",
  },
  uploadContainer: {
    display: "flex",
    margin: "25px",
    justifyContent: "flex-start",
    border: "1px solid black",
    padding: "25px",
    flexDirection: "column",
    borderRadius: "12px",
  },
  uploadRadioBtn: {
    display: "flex",
    flexDirection: "row",
  },
  uploadInputBtn: {
    marginBottom: "15px",
  },
  uploadBtn: {
    width: "250px",
    height: "50px",
    background: "#3254CB",
    boxShadow: "4px 4px 8px #B7C7FF",
    borderRadius: "10px",
    color: "#FFFFFF",
  },
  cloudIcon: {
    marginRight: "10px",
    marginTop: "5px",
  },
  tableContainer: {
    padding: "15px",
    display: "flex",
    justifyContent: "flex-start",
    fontSize: "24px",
    fontWeight: "600",
  },
  tableMain: {
    marginTop: "40px",
    marginLeft: "50px",
    marginRight: "50px",
    background: "#FFFFFF",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
    borderRadius: "10px",
  },
  tableView: {
    postion: "absolute",
    width: "110px",
    height: "30px",
    background: "#3254CB",
    borderRadius: "20px",
    color: "#FFFFFF",
    fontSize: "15px",
    textTransform: "none",
    marginRight:'20px'
  },
  tableEdit: {
    postion: "absolute",
    width: "110px",
    height: "30px",
    background: "#FFFFFF",
    borderRadius: "20px",
    color: "#3254CB",
    fontSize: "15px",
    border: "1px solid #3254CB",
    textTransform: "none",
  },
  tableRowHeader: {
    background: "#E8EDFF"
  },
}));
