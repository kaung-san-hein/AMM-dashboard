import { DetailDataRow } from "../../components/detailDataRow/DetailDataRow";
import CustomModal from "../../components/modal/CustomModal";

const ProductDetail = ({ open, setOpen, data }) => {
  return (
    <CustomModal
      title="Product Detail"
      isOpen={open}
      onClick={() => setOpen(!open)}
    >
      <DetailDataRow title="Category" text={data?.category?.name} />
      <DetailDataRow title="Size" text={data?.size} />
      <DetailDataRow title="Net Weight" text={data?.net_weight} />
      <DetailDataRow title="Kg" text={data?.kg} />
      <DetailDataRow title="MadeIn" text={data?.made_in} />
      <DetailDataRow title="Price" text={`${data?.price} Ks`} />
      <DetailDataRow title="Stock" text={data?.stock} />
      <DetailDataRow title="Description" text={data?.description} />
    </CustomModal>
  );
};

export default ProductDetail;
