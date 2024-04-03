import { config } from "@/config";
import Link from "next/link";



export default function CourseCard(params: { courseName: string, courseCode: string }) {
    return <Link href={`${config.server}/course` + new URLSearchParams({
        courseCode: params.courseCode
    })}>{params.courseName}</Link>

}