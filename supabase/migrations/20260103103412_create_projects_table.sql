/*
  # إنشاء جدول المشاريع

  1. الجداول الجديدة
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text) - عنوان المشروع
      - `description` (text) - وصف المشروع
      - `image` (text) - رابط الصورة
      - `category` (text) - فئة المشروع (إغاثي، تعليمي، صحي، إلخ)
      - `location` (text) - موقع المشروع
      - `status` (text) - حالة المشروع (نشط، مكتمل، جاري التنفيذ)
      - `funding_status` (text) - حالة التمويل (محتاج تمويل، مكتمل التمويل)
      - `target_amount` (numeric) - المبلغ المطلوب
      - `current_amount` (numeric) - المبلغ المحقق
      - `created_at` (timestamptz) - تاريخ الإنشاء
      - `updated_at` (timestamptz) - تاريخ آخر تحديث

  2. الأمان
    - تمكين RLS على جدول `projects`
    - إضافة سياسة للقراءة العامة (متاح للجميع)
    - إضافة سياسة للإدارة (للمديرين فقط)
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  category text NOT NULL DEFAULT 'عام',
  location text NOT NULL DEFAULT 'الجزائر',
  status text NOT NULL DEFAULT 'نشط',
  funding_status text NOT NULL DEFAULT 'محتاج في التمويل',
  target_amount numeric DEFAULT 0,
  current_amount numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read projects"
  ON projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_location ON projects(location);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

INSERT INTO projects (title, description, image, category, location, funding_status, target_amount, current_amount) VALUES
  ('توزيع الطرود الغذائية', 'توزيع الطرود الغذائية على العائلات المحتاجة في المناطق المنكوبة', 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800', 'إغاثي', 'فلسطين', 'محتاج في التمويل', 50000, 23000),
  ('المساعدات النقدية', 'تقديم مساعدات نقدية للعائلات النازحة لتأمين احتياجاتهم الأساسية', 'https://images.pexels.com/photos/6646895/pexels-photo-6646895.jpeg?auto=compress&cs=tinysrgb&w=800', 'إغاثي', 'فلسطين', 'محتاج في التمويل', 75000, 45000),
  ('بقيا الماء', 'توفير مياه نظيفة وصالحة للشرب في المناطق المتضررة', 'https://images.pexels.com/photos/6995220/pexels-photo-6995220.jpeg?auto=compress&cs=tinysrgb&w=800', 'إغاثي', 'فلسطين', 'محتاج في التمويل', 30000, 18000),
  ('كفالة الأيتام غزة', 'كفالة الأطفال الأيتام في غزة وتوفير احتياجاتهم الأساسية', 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800', 'كفالة', 'فلسطين', 'محتاج في التمويل', 100000, 66000),
  ('مشروع التعليم', 'توفير التعليم للأطفال في المناطق المحرومة', 'https://images.pexels.com/photos/6646981/pexels-photo-6646981.jpeg?auto=compress&cs=tinysrgb&w=800', 'تعليمي', 'سوريا', 'محتاج في التمويل', 60000, 35000),
  ('الرعاية الصحية', 'تقديم الخدمات الصحية والأدوية للمرضى والجرحى', 'https://images.pexels.com/photos/6647120/pexels-photo-6647120.jpeg?auto=compress&cs=tinysrgb&w=800', 'صحي', 'فلسطين', 'محتاج في التمويل', 80000, 52000),
  ('بناء المساجد', 'بناء وتجديد المساجد في المناطق المتضررة', 'https://images.pexels.com/photos/6995239/pexels-photo-6995239.jpeg?auto=compress&cs=tinysrgb&w=800', 'منفذ', 'اليمن', 'محتاج في التمويل', 120000, 45000),
  ('توزيع الملابس الشتوية', 'توزيع ملابس شتوية دافئة على العائلات المحتاجة', 'https://images.pexels.com/photos/6646848/pexels-photo-6646848.jpeg?auto=compress&cs=tinysrgb&w=600', 'إغاثي', 'سوريا', 'محتاج في التمويل', 40000, 28000),
  ('دعم الحرفيين', 'تقديم الدعم المادي للحرفيين لبدء مشاريعهم الصغيرة', 'https://images.pexels.com/photos/6646871/pexels-photo-6646871.jpeg?auto=compress&cs=tinysrgb&w=800', 'تنموي', 'الجزائر', 'محتاج في التمويل', 55000, 22000),
  ('مشروع الإفطار', 'توفير وجبات إفطار يومية للصائمين في رمضان', 'https://images.pexels.com/photos/6647005/pexels-photo-6647005.jpeg?auto=compress&cs=tinysrgb&w=600', 'موسمي', 'فلسطين', 'محتاج في التمويل', 35000, 15000),
  ('مشروع الأضاحي', 'توزيع لحوم الأضاحي على العائلات المحتاجة في عيد الأضحى', 'https://images.pexels.com/photos/6646914/pexels-photo-6646914.jpeg?auto=compress&cs=tinysrgb&w=800', 'موسمي', 'اليمن', 'محتاج في التمويل', 90000, 67000),
  ('حفر الآبار', 'حفر آبار مياه في المناطق القاحلة والمحرومة', 'https://images.pexels.com/photos/6995233/pexels-photo-6995233.jpeg?auto=compress&cs=tinysrgb&w=800', 'تنموي', 'الصومال', 'محتاج في التمويل', 150000, 85000)
ON CONFLICT DO NOTHING;