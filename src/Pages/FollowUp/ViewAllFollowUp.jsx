import {
  Box,
  Button,
  Grid,
  TextField,
  Paper,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
  TimelineSeparator,
} from "@mui/lab";

import moment from "moment";
import React, { useEffect, useState } from "react";
import LeadServices from "../../services/LeadService";
import { useSelector } from "react-redux";
import { Popup } from "../../Components/Popup";
import { CustomLoader } from "../../Components/CustomLoader";

export const ViewAllFollowUp = (props) => {
  const { recordForEdit } = props;
  const [followUp, setFollowUp] = useState([]);
  const [followUpData, setFollowUpData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const data = useSelector((state) => state.auth);
  const userId = data.profile.email;
  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFollowUp({ ...followUp, [name]: value });
  };

  const getFollowUp = async () => {
    try {
      setOpen(true);
      const res = await LeadServices.getLeadsById(recordForEdit);
      setFollowUpData(res.data.followup);
      setOpen(false);
    } catch (err) {
      console.error(err);
      setOpen(false);
    }
  };

  useEffect(() => {
    getFollowUp();
  }, []);

  const createFollowUpLeadsData = async (e) => {
    try {
      e.preventDefault();
      setOpen(true);
      const data = {
        leads: recordForEdit,
        user: userId,
        activity: followUp.activity,
        notes: followUp.note,
        next_followup_date: followUp.nextFollowUpDate,
      };

      const res = await LeadServices.createFollowUpLeads(data);

      console.log("res :>> ", res);
      setOpenModal(false);
      getFollowUp();
      setOpen(false);
    } catch (error) {
      console.log("error :>> ", error);
      setOpen(false);
    }
  };
  return (
    <>
      <CustomLoader open={open} />
      <Popup
        maxWidth={"xl"}
        title={"Create Follow Up"}
        openPopup={openModal}
        setOpenPopup={setOpenModal}
      >
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={(e) => createFollowUpLeadsData(e)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Activity</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="activity"
                  label="Activity"
                  // value={filterQuery}
                  onChange={handleInputChange}
                >
                  {ActivityOption.map((option) => (
                    <MenuItem key={option.id} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                fullWidth
                name="note"
                size="small"
                label="Note"
                variant="outlined"
                value={followUp.companyName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                name="nextFollowUpDate"
                size="small"
                label="Next Followup Date"
                variant="outlined"
                value={
                  followUp.nextFollowUpDate ? followUp.nextFollowUpDate : ""
                }
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Button fullWidth type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </Popup>

      <Box component="form" noValidate sx={{ mt: 1 }}>
        <Paper
          sx={{
            p: 2,
            m: 4,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#F5F5F5",
          }}
        >
          <Box display="flex">
            <Box flexGrow={0.9} align="left"></Box>
            <Box flexGrow={2.5} align="center">
              <h3 className="Auth-form-title">View Activity</h3>
            </Box>
            <Box flexGrow={0.3} align="right">
              <Button
                variant="contained"
                color="success"
                onClick={handleClickOpen}
              >
                Create Activity
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 260,
              overflow: "hidden",
              overflowY: "scroll",
              // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
            }}
          >
            {followUpData && (
              <>
                {followUpData.map((data) => {
                  return (
                    <div key={data.id}>
                      <Timeline
                        sx={{
                          [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0.2,
                          },
                        }}
                      >
                        <TimelineItem>
                          <TimelineOppositeContent sx={{ px: 2 }}>
                            <Typography variant="h6">
                              {moment(data.current_date).format(
                                "DD/MM/YYYY h:mm"
                              )}
                            </Typography>
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent sx={{ width: "50%", color: "#333" }}>
                            <Typography
                              variant="h6"
                              sx={{ fontFamily: "Arial", fontWeight: "bold" }}
                            >
                              {data.activity} - {data.user} -
                              {data.next_followup_date &&
                                moment(data.next_followup_date).format(
                                  "DD/MM/YYYY"
                                )}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{ fontFamily: "Verdana", fontSize: "16px" }}
                            >
                              {data.notes}
                            </Typography>
                          </TimelineContent>
                        </TimelineItem>
                      </Timeline>
                    </div>
                  );
                })}
              </>
            )}
          </Box>
        </Paper>
      </Box>
    </>
  );
};

const ActivityOption = [
  {
    id: 1,
    value: "Not answering/busy/disconnecting",
    label: "Not answering/busy/disconnecting",
  },

  {
    id: 2,
    value: "Having stock",
    label: "Having stock",
  },
  {
    id: 3,
    value: "Rate issue",
    label: "Rate issue",
  },
  {
    id: 4,
    value: "Send detail on whatsapp/sms/email",
    label: "Send detail on whatsapp/sms/email",
  },
  {
    id: 5,
    value: "Not dealing in our product range",
    label: "Not dealing in our product range",
  },
  {
    id: 6,
    value: "Dealing in other brand",
    label: "Dealing in other brand",
  },
  {
    id: 7,
    value: "Buying a different product from other company",
    label: "Buying a different product from other company",
  },
  {
    id: 8,
    value: "Size or quantity is unavailabe with us",
    label: "Size or quantity is unavailabe with us",
  },
  {
    id: 9,
    value: "Transportation cost issue",
    label: "Transportation cost issue",
  },
  {
    id: 10,
    value: "Required without bill",
    label: "Required without bill",
  },
  {
    id: 11,
    value: "Call me back",
    label: "Call me back",
  },
  {
    id: 12,
    value: "Send sample",
    label: "Send sample",
  },
  {
    id: 13,
    value: "Not a decision maker",
    label: "Not a decision maker",
  },
  {
    id: 14,
    value: "Require own branding",
    label: "Require own branding",
  },
  {
    id: 15,
    value: "Small buyer, moved to dealer/distributor",
    label: "Small buyer, moved to dealer/distributor",
  },
  {
    id: 16,
    value: "Require exclusive distributorship/dealership",
    label: "Require exclusive distributorship/dealership",
  },
  {
    id: 17,
    value: "Quality issue",
    label: "Quality issue",
  },
];
