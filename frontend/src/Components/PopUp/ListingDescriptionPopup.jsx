/* eslint-disable react/prop-types */
const ListingDescriptionPopup = ({ description }) => {
  return (
    <>
      <dialog
        id="listing_modal"
        className="modal rounded-lg px-5"
        style={{ maxHeight: "vh" }} // Limit the maximum height of the dialog
      >
        <div className="modal-box w-11/12 max-w-4xl relative">
          {/* Add relative positioning to the modal-box */}
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute left-1 top-6">
              ✕
            </button>
          </form>
          <div className="pt-16 overflow-auto">
            {/* Add overflow-auto to enable scrolling within the container */}
            <h3 className="font-bold text-2xl">About this place</h3>
            <p className="py-4 whitespace-pre-wrap">{description}</p>
          </div>
        </div>
        <form
          method="dialog"
          className="modal-backdrop flex justify-end py-2 pb-5"
        >
          <button className="bg-black p-2 rounded-lg text-white">close</button>
        </form>
      </dialog>
    </>
  );
};

export default ListingDescriptionPopup;
