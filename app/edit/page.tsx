import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";

export default function EditCourse() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch existing course data
    fetch(`/api/courses/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse({
          name: data.name,
          description: data.description,
          price: data.price.toString(),
          category: data.category,
        });
      })
      .catch(() => toast.error("Failed to load course."))
      .finally(() => setLoading(false));
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => navigate("/dashboard");

  const handleEdit = async () => {
    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...course,
          price: parseFloat(course.price),
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Course updated successfully!");
      navigate("/dashboard");
    } catch {
      toast.error("Update failed. Try again.");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-10 shadow-2xl rounded-2xl">
      <CardHeader>
        <CardTitle>Edit Course</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : (
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input
                name="name"
                placeholder="Course Name"
                value={course.name}
                onChange={handleChange}
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <Textarea
                name="description"
                placeholder="Course Description"
                value={course.description}
                onChange={handleChange}
                className="rounded-xl"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Price ($)
                </label>
                <Input
                  name="price"
                  type="number"
                  placeholder="0.00"
                  value={course.price}
                  onChange={handleChange}
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <Select
                  name="category"
                  value={course.category}
                  onValueChange={(value) =>
                    setCourse((prev) => ({ ...prev, category: value }))
                  }
                  className="rounded-xl"
                >
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-4 pt-6">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button onClick={handleEdit} className="rounded-xl">
                Update
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
