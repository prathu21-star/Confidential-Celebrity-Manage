import { useEffect, useState } from "react";
import data from "./celebrities.json";
export default function UserList() {
  const [isEdit, setEdit] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    setUserData(data);
  }, []);
  const _calculateAge = (dateString) => {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / 31557600000);
  };
  const searchBox = (val) => {
    let tempSearch = val.target.value;
    let tempArray = userData.filter((item) =>
      item.first.toLowerCase().includes(tempSearch),
    );
    setUserData(tempArray.length < 1 ? userData : tempArray);
    // if (tempArray.length < 1) {
    //   setUserData(userData);
    // }
  };
  return (
    <>
      <div className="container" style={{ marginTop: 20 }}>
        <div className="form-group has-search">
          <span className="fa fa-search searchIcon" aria-hidden="true"></span>
          <input
            type="text"
            className="form-control searchText"
            placeholder="Search User"
            onChange={searchBox}
          />
        </div>

        <div
          className="panel-group "
          id="accordion"
          role="tablist"
          aria-multiselectable="true"
        >
          {userData.length > 0 &&
            userData.map((val) => (
              <div className="panel panel-default" key={val.id}>
                <div className="panel-heading" role="tab" id="headingOne">
                  <h4 className="panel-title">
                    <a
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href={`#${val.id}`}
                      aria-expanded="true"
                      aria-controls={`${val.id}`}
                      style={{
                        justifyContent: "start",
                        alignItems: "center",
                        display: "flex",
                        position: "relative",
                      }}
                    >
                      <img
                        src={`${val.picture}`}
                        alt=""
                        style={{ borderRadius: 100, width: 60, height: 60 }}
                      />
                      <span style={{ fontSize: "20px", marginLeft: 20 }}>
                        {val.first} {val.last}
                      </span>
                    </a>
                  </h4>
                </div>
                <div
                  id={`${val.id}`}
                  className="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingOne"
                >
                  <div className="panel-body">
                    <div className="row">
                      <div className="col-md-4 detail-col">
                        <label htmlFor="your-name" className="form-label">
                          Age
                        </label>
                        {!isEdit ? (
                          <p> {_calculateAge(val.dob)} Years</p>
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            id="your-name"
                            name="your-name"
                            value={val.first}
                          />
                        )}

                        {/* */}
                      </div>
                      <div className="col-md-4 detail-col">
                        <label htmlFor="your-surname" className="form-label">
                          Gender
                        </label>
                        {!isEdit ? (
                          <p>{val.gender}</p>
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            id="your-surname"
                            name="your-surname"
                            value={val.gender}
                          />
                        )}
                      </div>
                      <div className="col-md-4 detail-col">
                        <label htmlFor="your-surname" className="form-label">
                          Country
                        </label>
                        {!isEdit ? (
                          <p>{val.country}</p>
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            id="your-surname"
                            name="your-surname"
                            value={val.country}
                          />
                        )}
                      </div>
                      <br />
                      <div className="col-md-12 detail-col">
                        <label htmlFor="your-message" className="form-label">
                          Description
                        </label>

                        {!isEdit ? (
                          <p>{val.description}</p>
                        ) : (
                          <textarea
                            className="form-control"
                            id="your-message"
                            name="your-message"
                            rows="5"
                            required
                            value={val.description}
                          ></textarea>
                        )}
                      </div>
                    </div>
                    {!isEdit && (
                      <div className="row actionCon">
                        <div className="trashIcon">
                          <i
                            className="fa fa-trash-o"
                            aria-hidden="true"
                            data-toggle="modal"
                            data-target="#exampleModal"
                          ></i>
                        </div>
                        <div className="editIcon">
                          <i
                            className="fa fa-pencil"
                            aria-hidden="true"
                            onClick={() => setEdit(true)}
                          ></i>
                        </div>
                      </div>
                    )}
                    {isEdit && (
                      <div className="row actionCon">
                        <div className="crossIcon">
                          <i
                            className="fa fa-times-circle-o"
                            aria-hidden="true"
                            onClick={() => setEdit(false)}
                          ></i>
                        </div>
                        <div className="checkIcon">
                          <i
                            className="fa fa-check-circle-o"
                            aria-hidden="true"
                            onClick={() => setEdit(false)}
                          ></i>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="modal" id="exampleModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">
                  Are you sure you want to delete?
                </h4>
                <button
                  type="button"
                  className="close modal-close"
                  data-dismiss="modal"
                >
                  &times;
                </button>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default cancelBtn"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger deleteBtn"
                  data-dismiss="modal"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
