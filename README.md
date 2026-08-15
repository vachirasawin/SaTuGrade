# **Prediction**
- Web Application สำหรับการพยากรณ์ผลการเรียนในเทอมถัดไปของผู้ใช้ และให้คำแนะนำรายวิชาที่ผู้ใช้ควรให้ความสนใจมากขึ้น โดยอ้างอิงจากสายการเรียนของผู้ใช้

## **Web Application System for User**
### **Fetching System**
- ระบบการดึงข้อมูลผลการเรียนทั้งหมดของผู้ใช้จาก Server มาเก็บเพื่อพยากรณ์ผลการเรียนในเทอมถัดไป
- ผู้ใช้จำเป็นต้องกรอกข้อมูลส่วนตัวเพื่อให้ระบบสามารถขอข้อมูลจาก Server ได้
### **Scanning System**
- ระบบสแกนเอกสารปพ.1 เพื่อเก็บข้อมูลผลการเรียนทั้งหมดของผู้ใช้มาพยากรณ์ผลการเรียนในเทอมถัดไป
### **Manual Input System**
- ระบบเก็บข้อมูลผลการเรียนทั้งหมดของผู้ใช้จากการที่ให้ผู้ใช้กรอกข้อมูลด้วยตัวเอง เพื่อนำมาพยาหรณ์ผลการเรียนในเทอมถัดไป
### **Subjects Classification System**
- ระบบจัดหมวดหมู่รายวิชาจากข้อมูลผลการเรียนทั้งหมดของผู้ใช้ ให้ตรงกับรายวิชาของ Training Set ของ AI Model
### **Manual Subjects Classification System**
- ระบบจัดหมวดหมู่รายวิชาจากข้อมูลผลการเรียนทั้งหมดของผู้ใช้ ให้ตรงกับรายวิชาของ Training Set ของ AI Model โดยให้ผู้ใช้จัดหมวดหมู่ด้วยตัวเอง
### **Prediction System**
- ระบบพยากรณ์ผลการเรียนในเทอมถัดไปของผู้ใช้ด้วย AI Model
- AI Model เรียนรู้จากข้อมูลผลการเรียนของนักเรียนกลุ่มตัวอย่างหลาย ๆ คนในแต่ละสายการเรียนเพื่อความหลากหลายของ Training Set
### **Suggestion System**
- ระบบแนะนำรายวิชาที่ผู้ใช้ควรให้ความสนใจ โดยอ้างอิงจากสายการเรียนของผู้ใช้

## **Web Application System for Administrator**
### **Content Management System**
- ระบบจัดการเนื้อหาภายใน Web Application ได้แก่ สร้าง แก้ไข ลบ เรียงลำดับ
### **User Management System**
- ระบบจัดการผู้ใช้ภายใน Web Application ได้แก่ แก้ไข ลบ  จำกัดสิทธิ


## **Dataset (Training Set - Test Set)**
### **Significant Subjects in Each Program**
#### **Science-Mathematics Program : SM**
- คณิตศาสตร์พื้นฐาน (Basic Mathematics: BM)
- คณิตศาสตร์เพิ่มเติม (Additional Mathematics : AM)
- ฟิสิกส์ (Physics: Phy)
- เคมี (Chemistry : Chem)
- ชีวะ (Biology : Bio)
#### **Arts-Language Program : AL**
- คณิตศาสตร์พื้นฐาน (Basic Mathematics: BM)
- ภาษาไทย (Thai Language: TL)
- ภาษาอังกฤษพื้นฐาน (English Language : BEL)
- ภาษาอังกฤษเพิ่มเติม (Additional English Language: AEL)
- ภาษาเอก (Major Foreign Language : MFL)
- สังคม (Social : S)
#### **Arts-Calculation Program : AC**
- คณิตศาสตร์พื้นฐาน (Basic Mathematics: BM)
- คณิตศาสตร์เพิ่มเติม (Additional Mathematics : AM)
- ภาษาไทย (Thai Language: TL)
- ภาษาอังกฤษพื้นฐาน (English Language : BEL)
- สังคม (Social : S)
### **Sample Populations**
- นักเรียนที่จบการศึกษาจากระดับชั้นมัธยมศึกษาปีที่ 6 จำนวน XXX คน ในแต่ละ Program
- เก็บข้อมูลแค่ผลการเรียนในแต่ละวิชาหลักตามสายการเรียนของแต่ละเทอมเท่านั้น รวมทั้งสิ้น 6 เทอม
### **Training Set**
- แบ่งจาก Sample Populations มาร้อยละ 80 โดยใช้เทคนิค Random Sampling ซึ่งต้องไม่ซ้ำกับ Test Set ในแต่ละ Program
### **Test Set**
- แบ่งจาก Sample Populations มาร้อยละ 20 โดยใช้เทคนิค Random Sampling ซึ่งต้องไม่ซ้ำกับ Training Set ในแต่ละ Program

## **AI Model**
### **AI Model for Scanning System**
- ทำหน้าที่อ่านเอกสารปพ.1 และบันทึกเป็นไฟล์ csv เพื่อเก็บข้อมูลผลการเรียนทั้งหมดของผู้ใช้
- 
### **AI Model for Subjects Classification System**
- ทำหน้าที่แยกแยะรายวิชาออกเป็นหมวดหมู่ที่กำหนดตามสายการเรียน
- Supervised Learning แบบ Classification โดนใช้เทคนิค TF-IDF ร่วมกับ Logictic Regression
- รับข้อมูลสำหรับการแยกแยะรายวิชาออกเป็นหมวดหมู่เป็นชื่อรายวิชาเท่านั้น
```
{
  "subject_name": "สังคมศึกษาและวัฒนธรรม"
}
```
### **AI Model for Prediction System**
- ทำหน้าที่พยากรณ์ผลการเรียนในเทอมถัดไปของผู้ใช้จากข้อมูลผลการเรียนทั้งหมด
- Supervised Learning แบบ Classification โดนใช้เทคนิค XGBClassifier
- รับข้อมูลสำหรับการพยากรณ์ผลการเรียนเป็นผลการเรียนของผู้ใช้ในแต่ละรายวิชาที่จัดหมวดหมู่ไว้แล้วร่วมกับหน่วยกิต
```
{
  "program": "SM",
  "academic_records": [
    {
      "term": 1,
      "subjects": [
        { "subject_code": "BM", "credit": 1.5, "grade": 3.5 },
        { "subject_code": "Phy", "credit": 2.0, "grade": 3.0 },
        { "subject_code": "Chem", "credit": 1.5, "grade": 4.0 }
      ]
    },
    {
      "term": 2,
      "subjects": [
        { "subject_code": "BM", "credit": 1.5, "grade": 4.0 },
        { "subject_code": "Phy", "credit": 2.0, "grade": 2.5 },
        { "subject_code": "Chem", "credit": 1.5, "grade": 3.5 }
      ]
    }
  ]
}
```

## **Prediction**
### **Prediction for User**
- ผู้ใช้จะสามารถใช้งานได้ก็ต่อเมื่อได้รับผลการเรียนในเทอมก่อนหน้าแล้ว กล่าวคือผู้ใช้ต้องมีผลการเรียนอย่างน้อย 1 เทอม และมากที่สุด 5 เทอม
- ผู้ใช้จะได้รับการพยากรณ์ผลการเรียนของวิชาหลักของสายการเรียนนั้น ๆ ในเทอมถัดไป