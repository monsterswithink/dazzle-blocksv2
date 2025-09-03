"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRoom, useStorage } from "@liveblocks/react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/ui/resizable";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/ui/collapsible";
import { ChevronDown, Plus, Minus, Download, Eye, Loader2 } from "lucide-react";
import { ProfileSnapshotCard } from "@/blocks/ProfileSnapshotCard";
import { FloatingToolbar } from "@/tools/FloatingToolbar";
import { ProfileVideoButton } from "@/tools/ProfileVideoButton";
import { SharePopover } from "@/tools/SharePopover";
import { ResumeDisplay } from "@/blocks/ResumeDisplay";
import { EditableText } from "@/blocks/EditableText";
import { Skills } from "@/blocks/Skills";
import { Comments } from "@/components/comments/Comments";
import { toast } from "sonner";

interface ResumeEditorProps {
  resumeId: string;
}

export function ResumeEditor({ resumeId }: ResumeEditorProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const room = useRoom();
  const [resumeData, setResumeData] = useStorage<any | null | boolean>(
    (root) => root.resumeData,
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("modern");
  const [isSharePopoverOpen, setIsSharePopoverOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: false,
          autolink: true,
        },
      }),
    ],
    content: resumeData?.about?.description || "",
    onUpdate: ({ editor }) => {
      setResumeData((prev: any) => ({
        ...prev,
        about: { ...prev.about, description: editor.getHTML() },
      }));
    },
    editable: isEditing,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
    if (resumeData) {
      setLoading(false);
    }
  }, [resumeData, status, router]);

  useEffect(() => {
    if (editor && resumeData?.about?.description !== editor.getHTML()) {
      editor.commands.setContent(resumeData?.about?.description || "", {
        emitUpdate: false,
      });
    }
  });

  const handleAddExperience = () => {
    setResumeData((prev: any) => ({
      ...prev,
      experience: [
        ...(prev.experience || []),
        {
          id: Date.now(),
          title: "New Position",
          company: "New Company",
          years: "YYYY - YYYY",
          description: "<ul><li>Description of new role.</li></ul>",
        },
      ],
    }));
  };

  const handleRemoveExperience = (id: number) => {
    setResumeData((prev: any) => ({
      ...prev,
      experience: (prev.experience || []).filter((exp: any) => exp.id !== id),
    }));
  };

  const handleAddEducation = () => {
    setResumeData((prev: any) => ({
      ...prev,
      education: [
        ...(prev.education || []),
        {
          id: Date.now(),
          degree: "New Degree",
          university: "New University",
          years: "YYYY - YYYY",
          description: "<ul><li>Description of studies.</li></ul>",
        },
      ],
    }));
  };

  const handleRemoveEducation = (id: number) => {
    setResumeData((prev: any) => ({
      ...prev,
      education: (prev.education || []).filter((edu: any) => edu.id !== id),
    }));
  };

  const handleAddSkill = () => {
    setResumeData((prev: any) => ({
      ...prev,
      skills: [
        ...(prev.skills || []),
        { id: Date.now(), name: "New Skill", level: 3 },
      ],
    }));
  };

  const handleRemoveSkill = (id: number) => {
    setResumeData((prev: any) => ({
      ...prev,
      skills: (prev.skills || []).filter((skill: any) => skill.id !== id),
    }));
  };

  const handleSave = async () => {
    // The resume data is now saved automatically via the useEffect hook.
    // This function is now only responsible for toggling the editing state.
    setIsEditing(false);
    toast.success("Resume edits are saved automatically!");
  };

  const handleDownload = () => {
    setIsSharePopoverOpen(true);
  };

  const handleView = () => {
    router.push(`/resume/${resumeId}/view`);
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
        <div className="space-y-4 text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-gray-900 dark:text-gray-50" />
          <h1 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-gray-50">
            Loading resume...
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Please wait while we load the resume content.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold text-red-600">
            Error Loading Resume
          </h2>
          <p className="text-gray-700 dark:text-gray-300">{error}</p>
          <Button onClick={() => router.push("/profile")}>
            Back to Profile
          </Button>
        </div>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            Resume Not Found
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            The resume with ID &quot;{resumeId}&quot; could not be found.
          </p>
          <Button onClick={() => router.push("/profile")}>
            Back to Profile
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-950">
      <header className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-900">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Resume Editor</h1>
          <Select value={selectedTheme} onValueChange={setSelectedTheme}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="classic">Classic</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <SharePopover
            isOpen={isSharePopoverOpen}
            onOpenChange={setIsSharePopoverOpen}
            resumeId={resumeId}
          />
          <Button variant="outline" size="sm" onClick={handleView}>
            <Eye className="w-4 h-4 mr-2" /> View
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" /> Share
          </Button>
          <ProfileVideoButton />
          <Button
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
            size="sm"
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel
            defaultSize={30}
            minSize={20}
            className="p-4 overflow-y-auto"
          >
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <EditableText
                      id="name"
                      value={resumeData.personal?.name || ""}
                      onChange={(e) =>
                        setResumeData((prev: any) => ({
                          ...prev,
                          personal: { ...prev.personal, name: e.target.value },
                        }))
                      }
                      isEditing={isEditing}
                      className="text-2xl font-bold"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <EditableText
                      id="title"
                      value={resumeData.personal?.title || ""}
                      onChange={(e) =>
                        setResumeData((prev: any) => ({
                          ...prev,
                          personal: { ...prev.personal, title: e.target.value },
                        }))
                      }
                      isEditing={isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <EditableText
                      id="email"
                      value={resumeData.personal?.email || ""}
                      onChange={(e) =>
                        setResumeData((prev: any) => ({
                          ...prev,
                          personal: { ...prev.personal, email: e.target.value },
                        }))
                      }
                      isEditing={isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <EditableText
                      id="phone"
                      value={resumeData.personal?.phone || ""}
                      onChange={(e) =>
                        setResumeData((prev: any) => ({
                          ...prev,
                          personal: { ...prev.personal, phone: e.target.value },
                        }))
                      }
                      isEditing={isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <EditableText
                      id="linkedin"
                      value={resumeData.personal?.linkedin || ""}
                      onChange={(e) =>
                        setResumeData((prev: any) => ({
                          ...prev,
                          personal: {
                            ...prev.personal,
                            linkedin: e.target.value,
                          },
                        }))
                      }
                      isEditing={isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="github">GitHub</Label>
                    <EditableText
                      id="github"
                      value={resumeData.personal?.github || ""}
                      onChange={(e) =>
                        setResumeData((prev: any) => ({
                          ...prev,
                          personal: {
                            ...prev.personal,
                            github: e.target.value,
                          },
                        }))
                      }
                      isEditing={isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <EditorContent editor={editor} />
                  ) : (
                    <div
                      className="prose dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: resumeData.about?.description || "",
                      }}
                    />
                  )}
                </CardContent>
              </Card>

              <Collapsible
                open={activeSection === "experience"}
                onOpenChange={() =>
                  setActiveSection(
                    activeSection === "experience" ? null : "experience"
                  )
                }
                className="space-y-2"
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Experience
                    </CardTitle>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-9 p-0">
                        <ChevronDown className="h-4 w-4" />
                        <span className="sr-only">Toggle Experience</span>
                      </Button>
                    </CollapsibleTrigger>
                  </CardHeader>
                  <CollapsibleContent className="space-y-4 p-4 pt-0">
                    {(resumeData.experience || []).map(
                      (exp: any, index: number) => (
                        <div
                          key={exp.id}
                          className="border-b pb-4 last:border-b-0 last:pb-0"
                        >
                          <div>
                            <Label htmlFor={`exp-title-${index}`}>Title</Label>
                            <EditableText
                              id={`exp-title-${index}`}
                              value={exp.title || ""}
                              onChange={(e) =>
                                setResumeData((prev: any) => ({
                                  ...prev,
                                  experience: (prev.experience || []).map(
                                    (item: any) =>
                                      item.id === exp.id
                                        ? { ...item, title: e.target.value }
                                        : item
                                  ),
                                }))
                              }
                              isEditing={isEditing}
                              className="font-semibold"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`exp-company-${index}`}>
                              Company
                            </Label>
                            <EditableText
                              id={`exp-company-${index}`}
                              value={exp.company || ""}
                              onChange={(e) =>
                                setResumeData((prev: any) => ({
                                  ...prev,
                                  experience: (prev.experience || []).map(
                                    (item: any) =>
                                      item.id === exp.id
                                        ? { ...item, company: e.target.value }
                                        : item
                                  ),
                                }))
                              }
                              isEditing={isEditing}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`exp-years-${index}`}>Years</Label>
                            <EditableText
                              id={`exp-years-${index}`}
                              value={exp.years || ""}
                              onChange={(e) =>
                                setResumeData((prev: any) => ({
                                  ...prev,
                                  experience: (prev.experience || []).map(
                                    (item: any) =>
                                      item.id === exp.id
                                        ? { ...item, years: e.target.value }
                                        : item
                                  ),
                                }))
                              }
                              isEditing={isEditing}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`exp-description-${index}`}>
                              Description
                            </Label>
                            {isEditing ? (
                              <Textarea
                                id={`exp-description-${index}`}
                                value={(exp.description || "").replace(
                                  /<\/?ul>|<\/?li>/g,
                                  ""
                                )}
                                onChange={(e) =>
                                  setResumeData((prev: any) => ({
                                    ...prev,
                                    experience: (prev.experience || []).map(
                                      (item: any) =>
                                        item.id === exp.id
                                          ? {
                                              ...item,
                                              description: `<ul><li>${e.target.value}</li></ul>`,
                                            }
                                          : item
                                    ),
                                  }))
                                }
                                className="min-h-[80px]"
                              />
                            ) : (
                              <div
                                className="prose dark:prose-invert max-w-none text-sm"
                                dangerouslySetInnerHTML={{
                                  __html: exp.description || "",
                                }}
                              />
                            )}
                          </div>
                          {isEditing && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRemoveExperience(exp.id)}
                              className="mt-2"
                            >
                              <Minus className="w-4 h-4 mr-2" /> Remove
                            </Button>
                          )}
                        </div>
                      )
                    )}
                    {isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddExperience}
                        className="w-full mt-4 bg-transparent"
                      >
                        <Plus className="w-4 h-4 mr-2" /> Add Experience
                      </Button>
                    )}
                  </CollapsibleContent>
                </Card>
              </Collapsible>

              <Collapsible
                open={activeSection === "education"}
                onOpenChange={() =>
                  setActiveSection(
                    activeSection === "education" ? null : "education"
                  )
                }
                className="space-y-2"
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Education
                    </CardTitle>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-9 p-0">
                        <ChevronDown className="h-4 w-4" />
                        <span className="sr-only">Toggle Education</span>
                      </Button>
                    </CollapsibleTrigger>
                  </CardHeader>
                  <CollapsibleContent className="space-y-4 p-4 pt-0">
                    {(resumeData.education || []).map(
                      (edu: any, index: number) => (
                        <div
                          key={edu.id}
                          className="border-b pb-4 last:border-b-0 last:pb-0"
                        >
                          <div>
                            <Label htmlFor={`edu-degree-${index}`}>
                              Degree
                            </Label>
                            <EditableText
                              id={`edu-degree-${index}`}
                              value={edu.degree || ""}
                              onChange={(e) =>
                                setResumeData((prev: any) => ({
                                  ...prev,
                                  education: (prev.education || []).map(
                                    (item: any) =>
                                      item.id === edu.id
                                        ? { ...item, degree: e.target.value }
                                        : item
                                  ),
                                }))
                              }
                              isEditing={isEditing}
                              className="font-semibold"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`edu-university-${index}`}>
                              University
                            </Label>
                            <EditableText
                              id={`edu-university-${index}`}
                              value={edu.university || ""}
                              onChange={(e) =>
                                setResumeData((prev: any) => ({
                                  ...prev,
                                  education: (prev.education || []).map(
                                    (item: any) =>
                                      item.id === edu.id
                                        ? {
                                            ...item,
                                            university: e.target.value,
                                          }
                                        : item
                                  ),
                                }))
                              }
                              isEditing={isEditing}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`edu-years-${index}`}>Years</Label>
                            <EditableText
                              id={`edu-years-${index}`}
                              value={edu.years || ""}
                              onChange={(e) =>
                                setResumeData((prev: any) => ({
                                  ...prev,
                                  education: (prev.education || []).map(
                                    (item: any) =>
                                      item.id === edu.id
                                        ? { ...item, years: e.target.value }
                                        : item
                                  ),
                                }))
                              }
                              isEditing={isEditing}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`edu-description-${index}`}>
                              Description
                            </Label>
                            {isEditing ? (
                              <Textarea
                                id={`edu-description-${index}`}
                                value={(edu.description || "").replace(
                                  /<\/?ul>|<\/?li>/g,
                                  ""
                                )}
                                onChange={(e) =>
                                  setResumeData((prev: any) => ({
                                    ...prev,
                                    education: (prev.education || []).map(
                                      (item: any) =>
                                        item.id === edu.id
                                          ? {
                                              ...item,
                                              description: `<ul><li>${e.target.value}</li></ul>`,
                                            }
                                          : item
                                    ),
                                  }))
                                }
                                className="min-h-[80px]"
                              />
                            ) : (
                              <div
                                className="prose dark:prose-invert max-w-none text-sm"
                                dangerouslySetInnerHTML={{
                                  __html: edu.description || "",
                                }}
                              />
                            )}
                          </div>
                          {isEditing && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRemoveEducation(edu.id)}
                              className="mt-2"
                            >
                              <Minus className="w-4 h-4 mr-2" /> Remove
                            </Button>
                          )}
                        </div>
                      )
                    )}
                    {isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddEducation}
                        className="w-full mt-4 bg-transparent"
                      >
                        <Plus className="w-4 h-4 mr-2" /> Add Education
                      </Button>
                    )}
                  </CollapsibleContent>
                </Card>
              </Collapsible>

              <Collapsible
                open={activeSection === "skills"}
                onOpenChange={() =>
                  setActiveSection(activeSection === "skills" ? null : "skills")
                }
                className="space-y-2"
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Skills
                    </CardTitle>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-9 p-0">
                        <ChevronDown className="h-4 w-4" />
                        <span className="sr-only">Toggle Skills</span>
                      </Button>
                    </CollapsibleTrigger>
                  </CardHeader>
                  <CollapsibleContent className="space-y-4 p-4 pt-0">
                    <Skills
                      skills={resumeData.skills || []}
                      isEditing={isEditing}
                      onSkillChange={(id, newName, newLevel) =>
                        setResumeData((prev: any) => ({
                          ...prev,
                          skills: (prev.skills || []).map((skill: any) =>
                            skill.id === id
                              ? { ...skill, name: newName, level: newLevel }
                              : skill
                          ),
                        }))
                      }
                      onRemoveSkill={handleRemoveSkill}
                    />
                    {isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddSkill}
                        className="w-full mt-4 bg-transparent"
                      >
                        <Plus className="w-4 h-4 mr-2" /> Add Skill
                      </Button>
                    )}
                  </CollapsibleContent>
                </Card>
              </Collapsible>

              <ProfileSnapshotCard />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            defaultSize={70}
            className="relative p-4 overflow-y-auto"
          >
            <ResumeDisplay resumeData={resumeData} theme={selectedTheme} />
            {isEditing && editor && <FloatingToolbar editor={editor} />}
            <Comments />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}

export default ResumeEditor;
