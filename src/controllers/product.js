import Product from "../model/Product.js";

export const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        if(products.length === 0){
            return res.status(404).json({message: "khong tim thay san pham"});
        };
        return res.status(200).json({message: "Lay danh sach san pham thanh cong", datas: products,});
    }catch(error) {
        return res.status(500).json({message: error});
    };
};

export const getDetail = async (req, res) => {
    try {      
        console.log(req);
        const product = await Product.findOne({phone : req.params.phone});
        if(!product){
            return res.status(404).json({message: 'Khong tim thanh san pham'});
        }
        return res.status(200).json({
            message: 'Lay san pham thanh cong',
            datas: product,
        })
    }catch(error) {
        return res.status(500).json({message: error});
    };
};

export const create = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        if(!product) {
            return res.status(404).json({message: 'Tao san pham khong thanh san pham'});
        }
        return res.status(200).json({
            message: 'Tao san pham thanh cong',
            datas: product,
        })
    } catch (error) {
        return res.status(500).json({message: error});
    }
};

export const update = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate({phone : req.params.phone}, req.body, {new: true,});
        if(!product) {
            return res.status(404).json({message: 'Cap nhat san pham khong thanh cong'});
        }
        return res.status(200).json({
            message: 'Cap nhat san pham thanh cong',
        })
    } catch (error) {
        return res.status(500).json({message: error});
    }
};

export const remove = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({phone : req.params.phone});
        if(!product) {
            return res.status(404).json({message: 'Xoa san pham khong thanh cong'});
        }
        return res.status(200).json({
            message: 'Xoa san pham thanh cong',
            datas: product,
        })
    } catch (error) {
        return res.status(500).json({message: error});
    }
};