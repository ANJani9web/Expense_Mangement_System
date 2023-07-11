import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Form, Input, Modal, Select, Table, message, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import Spinner from "../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
import "../styles/Homepage.css";

const { RangePicker } = DatePicker;

const HomePage = () => {
  // for modal
  const [showModal, setShowModal] = useState(false);

  // loading
  const [loading, setLoading] = useState(false);

  // for transactions
  const [alltransactions, setAllTransactions] = useState([]);

  // for frequency
  const [frequency, setFrequency] = useState("7");

  // custom date picker
  const [selectedDate, setselectedDate] = useState([]);

  // for type filter
  const [type, setType] = useState("all");

  // for analytics
  const [viewData, setviewData] = useState("table");

  // for editable and deletable functioning
  const [editable, setEditable] = useState(null);

  // data table
  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  // useEffect hook
  useEffect(() => {
    // get all transactions
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/transactions/get-transactions", {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        setAllTransactions(res.data);
        setLoading(false);
        console.log(res.data);
        // setAllTransactions(res.data);
      } catch (error) {
        console.log(error);
        message.error("Something went wrong");
        setLoading(false);
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type,setAllTransactions]);

  // delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/transactions/delete-transaction", {
        transactionId: record._id,
      });
      setLoading(false);
      message.success("Transaction Deleted Successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Something went wrong");
    }
  };


  // for form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post("/transactions/edit-transaction", {
          payload: {
            ...values,
            userid: user._id,
          },
          transacationId: editable._id,
        });
        setLoading(false);
        message.success("Transaction Updated Successfully");
        //window.location.reload();
      } else {
        await axios.post("/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        setLoading(false);
        message.success("Transaction Added Successfully");
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      console.log(error)
      message.error("please fill all fields");
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}

      {/* Filters */}
      <div className="filters top_filter">
        {/* for range filters */}
        <div>
          <h6>Select Frequency</h6>
          <Select
            value={frequency}
            onChange={(values) => {
              setFrequency(values);
              console.log(values);
            }}
          >
            <Select.Option value="1">Last 1 Day</Select.Option>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>

          {/* for custom date picker */}
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => {
                setselectedDate(values);
                console.log(values);
              }}
            />
          )}
        </div>

        {/* for type filter */}

        <div className="filter-tab">
          <h6>Select Type</h6>
          <Select
            value={type}
            onChange={(values) => {
              setType(values);
              console.log(values);
            }}
          >
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </div>

        {/* for analytics part */}
        <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setviewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setviewData("analytics")}
          />
        </div>

        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>


      {/* for table or analytics */}
      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={alltransactions} />
        ) : (
          <Analytics alltransactions={alltransactions} />
        )}
        {/* // <Table columns={columns} dataSource={alltransactions} /> */}
      </div>

      {/* Modal */}
      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form
          Layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          {/* for amount */}
          <FormItem label="Amount" name="amount">
            <Input type="number" required />
          </FormItem>

          {/* for type */}
          <FormItem label="Type" name="type" required>
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </FormItem>

          {/* for category */}
          <FormItem label="Category" name="category" required>
            <Select>
              {/* <Select.Option value='salary'>Salary</Select.Option>
              <Select.Option value='grocery'>Grocery</Select.Option>
              <Select.Option value='rent'>Rent</Select.Option>
              <Select.Option value='bills'>Bills</Select.Option>
              <Select.Option value='others'>Others</Select.Option> */}
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </FormItem>

          {/* for reference */}
          <FormItem label="Reference" name="reference">
            <Input type="text" required/>
          </FormItem>

          {/* for description */}
          <FormItem label="Description" name="description">
            <Input type="text" required/>
          </FormItem>

          {/* for date */}
          <FormItem label="Date" name="date" >
            <Input type="date" required/>
          </FormItem>

          {/* for submit button */}
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">
              {" "}
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
