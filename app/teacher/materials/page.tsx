"use client"

import { useEffect, useMemo, useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Trash2, Download, ImageIcon, Music, FileText, Video, Search, Filter } from "lucide-react"

type MaterialItem = {
  name: string
  url: string
  type: string
  size: number
  uploadedAt: string
}

export default function TeacherMaterialsPage() {
  const courses = useMemo(
    () => [
      { code: "MATH301", name: "Advanced Mathematics", semester: "Fall 2024" },
      { code: "MATH101", name: "Calculus I", semester: "Fall 2024" },
      { code: "MATH205", name: "Statistics", semester: "Fall 2024" },
      { code: "MATH220", name: "Linear Algebra", semester: "Fall 2024" },
    ],
    []
  )

  const [selectedCourse, setSelectedCourse] = useState<string>(courses[0]?.code || "")
  const [files, setFiles] = useState<FileList | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [materials, setMaterials] = useState<MaterialItem[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (!selectedCourse) return
    const fetchMaterials = async () => {
      const res = await fetch(`/api/materials?course=${encodeURIComponent(selectedCourse)}`)
      if (!res.ok) {
        setMaterials([])
        return
      }
      const data = await res.json()
      setMaterials(data.items || [])
    }
    fetchMaterials()
  }, [selectedCourse])

  const onUpload = async () => {
    if (!files || !selectedCourse) return
    setIsUploading(true)
    try {
      const form = new FormData()
      form.append("courseCode", selectedCourse)
      Array.from(files).forEach((f) => form.append("files", f))
      const res = await fetch("/api/materials/upload", { method: "POST", body: form })
      if (res.ok) {
        setFiles(null)
        const refreshed = await fetch(`/api/materials?course=${encodeURIComponent(selectedCourse)}`)
        const data = await refreshed.json()
        setMaterials(data.items || [])
      }
    } finally {
      setIsUploading(false)
    }
  }

  const onDelete = async (name: string) => {
    if (!selectedCourse) return
    await fetch(`/api/materials?course=${encodeURIComponent(selectedCourse)}&name=${encodeURIComponent(name)}`, {
      method: "DELETE",
    })
    const res = await fetch(`/api/materials?course=${encodeURIComponent(selectedCourse)}`)
    const data = await res.json()
    setMaterials(data.items || [])
  }

  const filtered = materials.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))

  const getFileIcon = (type: string) => {
    if (type.startsWith("video")) return <Video className="w-4 h-4" />
    if (type === "pdf" || type.includes("pdf")) return <FileText className="w-4 h-4" />
    if (type.startsWith("image")) return <ImageIcon className="w-4 h-4" />
    if (type.startsWith("audio")) return <Music className="w-4 h-4" />
    return <FileText className="w-4 h-4" />
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Materials</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search materials..." className="pl-8 w-64" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger>
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.code} • {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Materials</CardTitle>
          <CardDescription>Upload files for the selected course</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="md:col-span-3">
              <Label htmlFor="material-files">Files</Label>
              <Input id="material-files" type="file" multiple onChange={(e) => setFiles(e.target.files)} />
            </div>
            <div className="md:col-span-2 flex items-end">
              <Button className="w-full" onClick={onUpload} disabled={!files || isUploading || !selectedCourse}>
                <Upload className="w-4 h-4 mr-2" />
                {isUploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Materials</CardTitle>
          <CardDescription>{courses.find((c) => c.code === selectedCourse)?.name} • {selectedCourse}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[280px]">File</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead className="w-[160px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((m) => (
                  <TableRow key={m.name}>
                    <TableCell>
                      <div className="font-medium flex items-center gap-2">
                        <span className="w-7 h-7 bg-muted rounded flex items-center justify-center">
                          {getFileIcon(m.type)}
                        </span>
                        {m.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{m.type}</Badge>
                    </TableCell>
                    <TableCell>{formatBytes(m.size)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(m.uploadedAt).toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={m.url} download>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </a>
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => onDelete(m.name)}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {!filtered.length && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-sm text-muted-foreground">
                      No materials found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}


