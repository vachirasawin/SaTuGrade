import mongoose, { Schema } from "mongoose";

const createRecordSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        program: {
            type: String,
            required: true,
        },
        recordData: {
            type: Schema.Types.Mixed,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const CreateRecord = mongoose.models.CreateRecord || mongoose.model("CreateRecord", createRecordSchema);

export default CreateRecord;