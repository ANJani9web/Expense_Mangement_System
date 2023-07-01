import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Form, Input, Modal, Select, Table, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import Spinner from "../components/Spinner";

const HomePage = () => {
  // for modal
  const [showModal, setShowModal] = useState(false);

  // loading
  const [loading, setLoading] = useState(false);

  // for transactions
  const [alltransactions, setAllTransactions] = useState([]);

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
    },{
      title:"Actions"
    }
  ];


  // get all transactions
  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post("/transactions/get-transactions", {
        userid: user._id,
      });
      setLoading(false);
      console.log(res.data);
      setAllTransactions(res.data);
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
      setLoading(false);
    }
  };

  // useEffect hook
  useEffect(() => {
    getAllTransactions();
  }, []);

  // for form handling
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      await axios.post("/transactions/add-transaction", {
        ...values,
        userid: user._id,
      });
      setLoading(false);
      message.success("Transaction Added Successfully");
      setShowModal(false);
    } catch (error) {
      setLoading(false);
      message.error("Error while adding transaction");
      console.log(error);
    }
  };
  return (
    <Layout>
      {loading && <Spinner />}

      {/* Filters */}
      <div className="filters">
        <div>Range Filters</div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>

      <div className="content">
        <Table columns={columns} dataSource={alltransactions} />
      </div>

      {/* Modal */}
      <Modal
        title="Add Transaction"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form Layout="vertical" onFinish={handleSubmit}>
          {/* for amount */}
          <FormItem label="Amount" name="amount" required>
            <Input type="number" />
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
            <Input type="text" />
          </FormItem>

          {/* for description */}
          <FormItem label="Description" name="description">
            <Input type="text" />
          </FormItem>

          {/* for date */}
          <FormItem label="Date" name="date" required>
            <Input type="date" />
          </FormItem>

          {/* for submit button */}
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
